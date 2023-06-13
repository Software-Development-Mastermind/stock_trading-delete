import os
from flask import Flask
from flask_restx import Api

app = Flask(__name__)

if __name__ == '__main__':
  app.run(debug=True)
