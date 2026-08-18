#!/usr/bin/env python3
"""
server.py - Lightweight local web server for Rubik Vision Bluetooth Timer
Serves files on localhost to allow Web Bluetooth API access.
"""

import http.server
import socketserver
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Allow cross-origin and security contexts for Web Bluetooth
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def run_server(port=PORT):
    socketserver.TCPServer.allow_reuse_address = True
    for p in range(port, port + 20):
        try:
            with socketserver.TCPServer(("", p), Handler) as httpd:
                print(f"============================================================")
                print(f"🎲 Rubik Vision Bluetooth Timer Server Running!")
                print(f"============================================================")
                print(f"Local Access URL:   http://localhost:{p}")
                print(f"Network Access URL: http://127.0.0.1:{p}")
                print(f"Directory:          {DIRECTORY}")
                print(f"------------------------------------------------------------")
                print(f"💡 Note: Open in Google Chrome, Edge, or Bluefy to use")
                print(f"   Web Bluetooth features.")
                print(f"============================================================")
                httpd.serve_forever()
        except OSError:
            continue

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    run_server(port)
