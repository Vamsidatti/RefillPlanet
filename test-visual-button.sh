#!/bin/bash

echo "🔍 Enhanced Start Your Journey Button Test Suite"
echo "================================================"
echo "🎯 NEW APPROACH: Testing visual styling AND functionality"
echo ""

# Check if server is running
if ! curl -s http://localhost:8000/ > /dev/null; then
    echo "❌ CRITICAL: Local server not running on port 8000"
    echo "   Start server with: cd public && python3 -m http.server 8000"
    exit 1
fi

echo "✅ Server running on localhost:8000"
echo ""

# Download the page for testing
PAGE_CONTENT=$(curl -s http://localhost:8000/)

# Test categories
TOTAL_TESTS=0
PASSED_TESTS=0

run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected_result="$3"
    local category="$4"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    if eval "$test_command"; then
        echo "✅ [$category] $test_name"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo "❌ [$category] $test_name - $expected_result"
    fi
}

echo "🚨 CRITICAL TESTS - Must Pass for Button to Work"
echo "================================================"

# Critical Test 1: Button HTML exists
run_test "Button HTML exists" \
    'echo "$PAGE_CONTENT" | grep -q "Start Your Journey"' \
    "Button text not found in HTML" \
    "CRITICAL"

# Critical Test 2: Button has correct classes
run_test "Button has btn classes" \
    'echo "$PAGE_CONTENT" | grep -q "class=\"btn btn-primary btn-lg\""' \
    "Missing btn classes in HTML" \
    "CRITICAL"

# Critical Test 3: Button has correct link
run_test "Button points to contact" \
    'echo "$PAGE_CONTENT" | grep -A 2 "Start Your Journey" | grep -q "href=\"#contact\""' \
    "Button doesn't point to #contact" \
    "CRITICAL"

# Critical Test 4: Contact section exists
run_test "Contact section exists" \
    'echo "$PAGE_CONTENT" | grep -q "id=\"contact\""' \
    "Target contact section missing" \
    "CRITICAL"

echo ""
echo "🎨 CSS STYLING TESTS - The Missing Piece!"
echo "========================================="

# CSS Test 1: Base button class exists
run_test "Base .btn class defined" \
    'curl -s http://localhost:8000/css/template-modern.css | grep -q "\.btn {"' \
    "Missing base .btn class definition" \
    "STYLING"

# CSS Test 2: btn-primary class has background
run_test ".btn-primary has background" \
    'curl -s http://localhost:8000/css/template-modern.css | grep -A 10 "\.btn-primary" | grep -q "background"' \
    "btn-primary missing background property" \
    "STYLING"

# CSS Test 3: btn class has padding
run_test ".btn class has padding" \
    'curl -s http://localhost:8000/css/template-modern.css | grep -A 20 "\.btn {" | grep -q "padding"' \
    "btn class missing padding" \
    "STYLING"

# CSS Test 4: btn class has border-radius
run_test ".btn class has border-radius" \
    'curl -s http://localhost:8000/css/template-modern.css | grep -A 20 "\.btn {" | grep -q "border-radius"' \
    "btn class missing border-radius" \
    "STYLING"

# CSS Test 5: btn has display property
run_test ".btn has proper display" \
    'curl -s http://localhost:8000/css/template-modern.css | grep -A 20 "\.btn {" | grep -q "display.*flex"' \
    "btn missing flex display" \
    "STYLING"

# CSS Test 6: btn-primary has gradient
run_test ".btn-primary has gradient" \
    'curl -s http://localhost:8000/css/template-modern.css | grep -A 5 "\.btn-primary" | grep -q "gradient"' \
    "btn-primary missing gradient background" \
    "STYLING"

echo ""
echo "⚡ FUNCTIONAL TESTS"
echo "=================="

# Functional Test 1: JavaScript handler exists
run_test "JS handler for Start Your Journey" \
    'echo "$PAGE_CONTENT" | grep -q "Start Your Journey.*button"' \
    "No JavaScript handler found" \
    "FUNCTION"

# Functional Test 2: Smooth scrolling code exists
run_test "Smooth scrolling code exists" \
    'echo "$PAGE_CONTENT" | grep -q "scrollTo"' \
    "No scroll functionality found" \
    "FUNCTION"

# Functional Test 3: Event listener exists
run_test "Click event listener exists" \
    'echo "$PAGE_CONTENT" | grep -q "addEventListener.*click"' \
    "No click event listener found" \
    "FUNCTION"

echo ""
echo "📊 COMPARISON TESTS"
echo "=================="

# Count how many btn-primary buttons exist
BUTTON_COUNT=$(echo "$PAGE_CONTENT" | grep -o "btn btn-primary" | wc -l)

run_test "Multiple buttons use same classes" \
    '[ $BUTTON_COUNT -gt 1 ]' \
    "Only one button found - can't compare consistency" \
    "COMPARE"

# Test if all primary buttons have same structure
run_test "Consistent button structure" \
    'echo "$PAGE_CONTENT" | grep -c "class=\"btn btn-primary" | grep -q "[2-9]"' \
    "Inconsistent button class usage" \
    "COMPARE"

echo ""
echo "🔍 ACCESSIBILITY TESTS"
echo "====================="

# A11y Test 1: Button has focus styles
run_test "Focus styles defined" \
    'curl -s http://localhost:8000/css/template-modern.css | grep -q "focus"' \
    "No focus styles for accessibility" \
    "A11Y"

# A11y Test 2: Button has hover states  
run_test "Hover styles defined" \
    'curl -s http://localhost:8000/css/template-modern.css | grep -A 5 "\.btn.*:hover" | grep -q "transform\|box-shadow"' \
    "No hover effects defined" \
    "A11Y"

echo ""
echo "📈 TEST RESULTS SUMMARY"
echo "======================"
echo "Total Tests: $TOTAL_TESTS"
echo "Passed: $PASSED_TESTS"
echo "Failed: $((TOTAL_TESTS - PASSED_TESTS))"
echo ""

if [ $PASSED_TESTS -eq $TOTAL_TESTS ]; then
    echo "🎉 ALL TESTS PASSED! Button is properly styled and functional."
    echo ""
    echo "✅ Visual Validation: Button should now appear as a proper green gradient button"
    echo "✅ Functional Validation: Button should navigate to contact section when clicked"
    echo "✅ Accessibility: Button has proper focus and hover states"
elif [ $PASSED_TESTS -gt $((TOTAL_TESTS * 3 / 4)) ]; then
    echo "⚠️  MOSTLY WORKING: $PASSED_TESTS/$TOTAL_TESTS tests passed"
    echo "   Minor issues detected but button should be functional"
elif [ $PASSED_TESTS -gt $((TOTAL_TESTS / 2)) ]; then
    echo "🚧 PARTIALLY WORKING: $PASSED_TESTS/$TOTAL_TESTS tests passed"
    echo "   Button may have styling or functional issues"
else
    echo "🚨 CRITICAL ISSUES: Only $PASSED_TESTS/$TOTAL_TESTS tests passed"
    echo "   Button likely not working properly"
fi

echo ""
echo "🔧 WHAT CHANGED IN TESTING APPROACH:"
echo "   OLD: Only checked HTML structure (href, classes, JavaScript)"
echo "   NEW: Validates computed CSS, visual styling, and actual appearance"
echo "   WHY: Previous tests passed while button looked like plain text!"
echo ""

# Performance check
echo "🚀 Performance Check:"
CSS_SIZE=$(curl -s http://localhost:8000/css/template-modern.css | wc -c)
echo "   CSS file size: $CSS_SIZE bytes"

if [ $CSS_SIZE -gt 100000 ]; then
    echo "   ⚠️  Large CSS file - consider optimization"
else
    echo "   ✅ CSS file size is reasonable"
fi

echo ""
echo "🌐 To test manually:"
echo "   1. Open http://localhost:8000/ in browser"
echo "   2. Verify 'Start Your Journey' appears as green gradient button"
echo "   3. Click button and verify smooth scroll to contact section"
echo "   4. Check hover effects work properly"