import json
import sys

# import os
from flask import Flask, request

from utils import  convert_text, rest_infer
from flask_cors import CORS, cross_origin
import time

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/checked_toxic', methods=['POST'])
@cross_origin()
def hello():
    start_time = time.time()
    text_input = request.json
    texts = convert_text(text_input).tolist()
    
    if len(text_input)==0:
        result = []
    else:
        result = rest_infer(texts).tolist()
    
    return json.dumps(
        {
            "code": 200,
            "time": time.time()-start_time,
            "response": result
        }
    )

from flask import redirect, render_template
# code for front end
@app.route('/index')
def hello_world():
    return render_template('/index.html')
    # return redirect()

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)