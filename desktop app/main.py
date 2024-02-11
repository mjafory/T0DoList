from flask import Flask, render_template
import threading
import webview
from werkzeug.serving import make_server

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

def run_flask():
    # Create a simple server using the Flask app
    server = make_server('127.0.0.1', 5000, app)

    # Start the server in a separate thread
    server_thread = threading.Thread(target=server.serve_forever)
    server_thread.daemon = True  # Set the thread as daemon
    server_thread.start()

    # Wait for the server thread to join (i.e., finish) before exiting the Flask app
    server_thread.join()

if __name__ == '__main__':
    # Start Flask in a separate thread
    flask_thread = threading.Thread(target=run_flask)
    flask_thread.daemon = True  # Set the thread as daemon
    flask_thread.start()

    # Create and run the webview app in full-screen size
    webview.create_window("InspireTask", "http://127.0.0.1:5000/", width=1920, height=1000)
    webview.start()
