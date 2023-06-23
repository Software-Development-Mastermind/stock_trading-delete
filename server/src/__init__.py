import os
from flask import Flask

from dotenv import load_dotenv; load_dotenv()

from .extensions import db, jwt, CORS
from src.routes import api


def create_app():
  app = Flask(__name__)

  app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_CONNECTION_STRING')
  app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
  app.config['JWT_ALGORITHM'] = 'HS256'
  
  CORS.init_app(app, resources={r'/api/*': {'origins:': '*'}}) 
  jwt.init_app(app)
  db.init_app(app)

  app.register_blueprint(api)

  return app