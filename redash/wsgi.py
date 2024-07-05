from redash import create_app
from flask_cors import CORS

app = create_app()
@app.after_request
def apply_csp(response):
    response.headers['Content-Security-Policy'] = "frame-ancestors 'self' https://emanifest.mwan.gov.sa http://localhost:8080"
    return response
CORS(app,
     supports_credentials=True,
     expose_headers=["Set-Cookie"]
     )
