from flask import Flask
from flask_restful import Resource, Api

image_urls = [
			'https://media.giphy.com/media/CjmvTCZf2U3p09Cn0h/source.gif',
			'https://media.giphy.com/media/PUBxelwT57jsQ/source.gif',
			'https://media.giphy.com/media/twS7n4ssSaxkk/source.gif',
			'https://media.giphy.com/media/dC8jdwiSuBiet1SVgD/source.gif'
		]

app = Flask(__name__)
api = Api(app)

class Gif(Resource):
	def get(self):
		return {
			'url': image_urls[0]
		}
api.add_resource(Gif, '/')

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=6401, debug=True)