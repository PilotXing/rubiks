#!/bin/bash
# start.sh - 1-Click Offline Launcher for Rubik Vision Timer
cd "$(dirname "$0")"

# Kill any previous instance
kill $(pgrep -f "server.py") 2>/dev/null
sleep 0.5

echo "============================================================"
echo "🎲 Starting Rubik Vision Timer Server (Port 8080)..."
echo "============================================================"

# Try to open in browser if termux-open-url exists
if command -v termux-open-url &> /dev/null; then
    (sleep 1 && termux-open-url "http://localhost:8080") &
fi

python3 server.py 8080
