import os
from flask import Flask, Blueprint

from dotenv import load_dotenv; load_dotenv()

from .extensions import (
  api, 
  db, 
  jwt, 
  CORS
)

from src.routes.auth_routes import CreateNewUser, AuthenticateUser
from src.routes.stock_routes import (
  SearchByCompany, 
  SearchByTicker, 
  GetStockQuote, 
  GetStockFinancials
  )
from src.routes.user_routes import GetCash

api_bp = Blueprint('api', __name__, url_prefix='/api')

def create_app():
  app = Flask(__name__)

  app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_CONNECTION_STRING')
  app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
  app.config['JWT_ALGORITHM'] = 'HS256'
  
  api.init_app(api_bp)
  CORS.init_app(app, resources={r'/api/*': {'origins:': '*'}}) 
  jwt.init_app(app)
  db.init_app(app)

  app.register_blueprint(api_bp)

  api.add_resource(CreateNewUser, '/create_user')
  api.add_resource(AuthenticateUser, '/authenticate')
  
  api.add_resource(SearchByCompany, '/company_search/<search>')
  api.add_resource(SearchByTicker, '/ticker_search/<search>')
  api.add_resource(GetStockQuote, '/stock_quote/<symbol>')
  api.add_resource(GetStockFinancials, '/stock_financials/<symbol>')

  api.add_resource(GetCash, '/get_cash/<user_id>')

  return app