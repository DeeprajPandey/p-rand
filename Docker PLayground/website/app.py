from flask import Flask, render_template
from requests import get

app = Flask(__name__)

@app.route('/')
def index():
	gif = get('http://cat-api-service:6401').json()['url']
	return render_template('index.html', url=gif)

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=6400, debug=True)