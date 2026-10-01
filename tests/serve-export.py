"""Serve Next static export locally with Cloudflare Pages-style clean URLs."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import os

parser = argparse.ArgumentParser()
parser.add_argument("--port", type=int, default=4327)
parser.add_argument("--directory", default="out")
args = parser.parse_args()
os.chdir(args.directory)

class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        result = super().translate_path(path)
        # Next also emits an RSC directory with this basename. Prefer HTML.
        html = result.rstrip("/") + ".html"
        return html if Path(html).is_file() else result

    def log_message(self, *_args):
        pass

ThreadingHTTPServer(("127.0.0.1", args.port), Handler).serve_forever()
