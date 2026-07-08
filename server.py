#!/usr/bin/env python3
"""
Simple HTTP server that serves index.html by default
Run: python3 server.py
Then open: http://localhost:8080
"""

import http.server
import socketserver
import os
from urllib.parse import unquote

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers if needed
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def do_GET(self):
        # If root path, serve index.html
        if self.path == '/' or self.path == '':
            self.path = '/index.html'
        return super().do_GET()

PORT = 8080

# Change to the directory where the script is located
os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
    print(f"Server running at http://localhost:{PORT}/")
    print(f"Serving index.html by default")
    print("Press Ctrl+C to stop")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
