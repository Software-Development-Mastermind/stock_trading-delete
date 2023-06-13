import os
from flask import Flask
from .extensions import db
from src.routes import main


def create_app():
  app = Flask(__name__)
  app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_CONNECTION_STRING')
  db.init_app(app)

  app.register_blueprint(main)

  return app