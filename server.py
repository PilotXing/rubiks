#!/usr/bin/env python3
"""
server.py - Lightweight local web server for Rubik Vision Bluetooth Timer
Serves files on localhost to allow Web Bluetooth API access.
"""

import http.server
import socketserver
import os
import sys

import http.server
import socketserver
import os
import sys
import json
import time

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
LOGS_DIR = os.path.join(DIRECTORY, 'logs')
os.makedirs(LOGS_DIR, exist_ok=True)
TRACE_LOG_PATH = os.path.join(LOGS_DIR, 'scramble_trace.log')

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Allow cross-origin and security contexts for Web Bluetooth
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/scramble-log':
            try:
                length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(length).decode('utf-8')
                data = json.loads(body) if body else {}
                timestamp_str = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
                
                log_entry = {
                    'timestamp': timestamp_str,
                    'time_ms': int(time.time() * 1000),
                    **data
                }
                
                with open(TRACE_LOG_PATH, 'a', encoding='utf-8') as f:
                    f.write(json.dumps(log_entry, ensure_ascii=False) + '\n')
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(b'{"status":"ok"}')
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

def run_server(port=PORT):
    socketserver.TCPServer.allow_reuse_address = True
    for p in range(port, port + 20):
        try:
            with socketserver.TCPServer(("", p), Handler) as httpd:
                print(f"============================================================")
                print(f"Rubik Vision Bluetooth Timer Server Running!")
                print(f"============================================================")
                print(f"Local Access URL:   http://localhost:{p}")
                print(f"Network Access URL: http://127.0.0.1:{p}")
                print(f"Directory:          {DIRECTORY}")
                print(f"Trace Log Path:     {TRACE_LOG_PATH}")
                print(f"------------------------------------------------------------")
                print(f"Note: Open in Google Chrome, Edge, or Bluefy to use")
                print(f"   Web Bluetooth features.")
                print(f"============================================================")
                httpd.serve_forever()
        except OSError:
            continue

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    run_server(port)
