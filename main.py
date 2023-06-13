import os
from flask import Flask
from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_CONNECTION_STRING')
db = SQLAlchemy()
db.init_app(app)

if __name__ == '__main__':
  app.run(debug=True)
