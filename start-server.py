#!/usr/bin/env python3
"""
Simple HTTP server for portfolio development
Run with: python start-server.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def start_server():
    """Start the HTTP server and open browser"""
    
    # Change to the directory containing this script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 Portfolio server starting...")
        print(f"📂 Serving directory: {os.getcwd()}")
        print(f"🌐 Local server: http://localhost:{PORT}")
        print(f"🔍 Test page: http://localhost:{PORT}/test-portfolio.html")
        print(f"📱 Portfolio: http://localhost:{PORT}/index.html")
        print(f"\n💡 Press Ctrl+C to stop the server")
        
        # Try to open browser automatically
        try:
            webbrowser.open(f'http://localhost:{PORT}')
            print(f"🎯 Browser opened automatically")
        except:
            print(f"❗ Could not open browser automatically")
        
        print(f"\n" + "="*50)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print(f"\n🛑 Server stopped by user")
            sys.exit(0)

if __name__ == "__main__":
    start_server()