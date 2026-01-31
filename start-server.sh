#!/bin/bash
# Simple script to start server on port 8080 serving index.html

echo "Starting server on http://localhost:8080"
echo "Serving index.html by default"
echo "Press Ctrl+C to stop"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    python3 server.py
elif command -v python &> /dev/null; then
    python server.py
else
    echo "Error: Python not found. Please install Python 3."
    exit 1
fi
