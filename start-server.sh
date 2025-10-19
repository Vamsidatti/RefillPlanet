#!/bin/bash

# Reliable Server Startup Script for RefillPlanet
# This script ensures the server is actually running and accessible

PORT=8000
PUBLIC_DIR="/Users/vdatti/Documents/Vamsi Personal/RefillPlanet/refill-planet-web-ui/public"

echo "🚀 Starting RefillPlanet Development Server..."

# Kill any existing processes
echo "📋 Cleaning up existing processes..."
pkill -f "python3.*http.server" 2>/dev/null
lsof -ti:$PORT | xargs kill -9 2>/dev/null

# Wait for processes to fully terminate
sleep 2

# Start the server
echo "🌟 Starting server on port $PORT..."
cd "$PUBLIC_DIR" && python3 -m http.server $PORT &
SERVER_PID=$!

# Wait for server to initialize
sleep 3

# Verify server is actually accessible
echo "🔍 Verifying server accessibility..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT/ | grep -q "200"; then
    echo "✅ SERVER IS UP AND ACCESSIBLE!"
    echo "🌐 Local URL: http://localhost:$PORT/"
    echo "📱 Mobile URL: http://$(ipconfig getifaddr en0):$PORT/ (if on same network)"
    echo "🔧 Server PID: $SERVER_PID"
    echo ""
    echo "🎯 To stop the server:"
    echo "   kill $SERVER_PID"
    echo "   or run: pkill -f 'python3.*http.server'"
    echo ""
    echo "📊 Server Status Check:"
    curl -I http://localhost:$PORT/ 2>/dev/null | head -1
else
    echo "❌ SERVER FAILED TO START PROPERLY"
    echo "🔍 Debugging information:"
    lsof -i :$PORT
    ps aux | grep python3 | grep http.server
    exit 1
fi