import os

from flask import Flask, Blueprint

from dotenv import load_dotenv; load_dotenv()

from .extensions import (
  api, 
  db, 
  jwt, 
  CORS
)

from src.routes.auth_routes import CreateNewUser, AuthenticateUser, GetUserPassword
from src.routes.stock_routes import (
  SearchByCompany, 
  SearchByTicker, 
  GetStockQuote, 
  GetStockFinancials,
  GetCandles
  )
from src.routes.user_routes import GetCash, UpdateCash, GetPortfolio, BuyStock, SellStock

api_bp = Blueprint('api', __name__, url_prefix='/api')

def create_app():
  application = Flask(__name__, static_url_path='/', static_folder='../client/dist')
  app = application

  app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_CONNECTION_STRING')
  app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
  app.config['JWT_ALGORITHM'] = 'HS256'

  @app.route('/', defaults={'path': ''})
  @app.route('/<string:path>')
  def serve_static(path):
      try:
          return app.send_static_file(path)
      except:
          return app.send_static_file('index.html')
  
  api.init_app(api_bp)
  CORS.init_app(app, resources={r'/api/*': {'origins:': '*'}}) 
  jwt.init_app(app)
  db.init_app(app)

  app.register_blueprint(api_bp)

  api.add_resource(CreateNewUser, '/create_user')
  api.add_resource(AuthenticateUser, '/authenticate')
  api.add_resource(GetUserPassword, '/get_user_password/<user_id>')
  
  api.add_resource(SearchByCompany, '/company_search/<search>')
  api.add_resource(SearchByTicker, '/ticker_search/<search>')
  api.add_resource(GetStockQuote, '/stock_quote/<symbol>')
  api.add_resource(GetStockFinancials, '/stock_financials/<symbol>')
  api.add_resource(GetCandles, '/candles/<symbol>/<resolution>/<from_date>/<to_date>')

  api.add_resource(GetPortfolio, '/get_portfolio/<user_id>')
  api.add_resource(GetCash, '/get_cash/<user_id>')
  api.add_resource(UpdateCash, '/update_cash/<user_id>')
  api.add_resource(BuyStock, '/buy_stock/<user_id>')
  api.add_resource(SellStock, '/sell_stock/<user_id>')

  return app