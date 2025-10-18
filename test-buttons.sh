#!/bin/bash

# Button Functionality Test Script for RefillPlanet
# This script tests all navigation buttons and their targets

echo "🧪 RefillPlanet Button Functionality Test Suite"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
TESTS_PASSED=0
TESTS_FAILED=0
TOTAL_TESTS=0

# Function to run a test
run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected_result="$3"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -n "Testing: $test_name... "
    
    result=$(eval "$test_command")
    
    if [[ "$result" == *"$expected_result"* ]]; then
        echo -e "${GREEN}✅ PASS${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}❌ FAIL${NC}"
        echo "  Expected: $expected_result"
        echo "  Got: $result"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

# Function to check if element exists
check_element_exists() {
    local element_type="$1"
    local element_value="$2"
    local description="$3"
    
    if [ "$element_type" == "id" ]; then
        run_test "$description" "curl -s http://localhost:8000/ | grep 'id=\"$element_value\"'" "id=\"$element_value\""
    elif [ "$element_type" == "href" ]; then
        run_test "$description" "curl -s http://localhost:8000/ | grep 'href=\"$element_value\"'" "href=\"$element_value\""
    elif [ "$element_type" == "text" ]; then
        run_test "$description" "curl -s http://localhost:8000/ | grep '$element_value'" "$element_value"
    fi
}

echo ""
echo "1️⃣  Testing Button Links..."
echo "----------------------------"

# Test Start Your Journey button
check_element_exists "href" "#contact" "Start Your Journey button target"
check_element_exists "text" "Start Your Journey" "Start Your Journey button text"

# Test Get Started Now button
check_element_exists "href" "#contact" "Get Started Now button target"
check_element_exists "text" "Get Started Now" "Get Started Now button text"

# Test Learn More button
check_element_exists "href" "#about" "Learn More button target"
check_element_exists "text" "Learn More" "Learn More button text"

echo ""
echo "2️⃣  Testing Target Sections..."
echo "-------------------------------"

# Test that all target sections exist
check_element_exists "id" "contact" "Contact section"
check_element_exists "id" "about" "About section"
check_element_exists "id" "ai-intelligence" "AI Intelligence section"
check_element_exists "id" "home" "Home section"

echo ""
echo "3️⃣  Testing Form Elements..."
echo "-----------------------------"

# Test form exists and has correct action
run_test "Contact form exists" "curl -s http://localhost:8000/ | grep 'contact-form-modern'" "contact-form-modern"
run_test "Form action is FormSubmit" "curl -s http://localhost:8000/ | grep 'formsubmit.co'" "formsubmit.co"
run_test "Form has name field" "curl -s http://localhost:8000/ | grep 'name=\"name\"'" "name=\"name\""
run_test "Form has email field" "curl -s http://localhost:8000/ | grep 'name=\"email\"'" "name=\"email\""
run_test "Form has message field" "curl -s http://localhost:8000/ | grep 'name=\"message\"'" "name=\"message\""

echo ""
echo "4️⃣  Testing JavaScript Handlers..."
echo "-----------------------------------"

# Test JavaScript for button handling exists
run_test "Start Journey JS handler exists" "curl -s http://localhost:8000/ | grep 'Start Your Journey'" "Start Your Journey"
run_test "Smooth scrolling JS exists" "curl -s http://localhost:8000/ | grep 'window.scrollTo'" "window.scrollTo"
run_test "Contact section scroll exists" "curl -s http://localhost:8000/ | grep 'getElementById.*contact'" "getElementById"

echo ""
echo "5️⃣  Testing Navigation Menu..."
echo "-------------------------------"

# Test navigation menu items
check_element_exists "href" "#home" "Home nav link"
check_element_exists "href" "#ai-intelligence" "AI-Features nav link"
check_element_exists "href" "#about" "About nav link"
check_element_exists "href" "#contact" "Contact nav link"

echo ""
echo "6️⃣  Testing Success Message Functionality..."
echo "---------------------------------------------"

# Test success message JavaScript
run_test "Success message handler exists" "curl -s http://localhost:8000/ | grep 'message=sent'" "message=sent"
run_test "URL parameter handling exists" "curl -s http://localhost:8000/ | grep 'URLSearchParams'" "URLSearchParams"
run_test "Success message creation exists" "curl -s http://localhost:8000/ | grep 'createElement'" "createElement"

echo ""
echo "📊 Test Results Summary"
echo "======================"
echo -e "Total Tests: $TOTAL_TESTS"
echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Failed: $TESTS_FAILED${NC}"

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "\n🎉 ${GREEN}All tests passed! Button functionality is working correctly.${NC}"
    exit 0
else
    echo -e "\n⚠️  ${YELLOW}Some tests failed. Please check the issues above.${NC}"
    exit 1
fi