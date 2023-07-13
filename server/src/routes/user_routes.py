from flask import request
from flask_restx import Resource

from ..extensions import db
from src.models.users import User
from src.models.stocks import Stock
from src import api

@api.route('/get_portfolio/<user_id>')
class GetPortfolio(Resource):
  def get(self, user_id):

    stocks = Stock.query.filter_by(user_id=user_id).all()

    if stocks:
      stocks_data = []
      for stock in stocks:
        stocks_data = {
          'id': stock.id,
          'symbol': stock.symbol,
          'shares': stock.shares,
          'cost': stock.cost,
        }
        stocks_data.append(stocks_data)

      return stocks_data, 200
    
    else:

      return "Portfolio not found!", 404
    
@api.route('/get_cash/<user_id>')
class GetCash(Resource):
  def get(self, user_id):

    user = User.query.filter_by(id=user_id).first()
    print(user)
    if user:
      cash = user.cash
      return {'cash': cash}, 200
    
    else:

      return "Unable to locate user cash.", 404

@api.route('/update_cash/<user_id>')
class UpdateCash(Resource):
  def post(self, user_id):

    user = User.query.filter_by(id=user_id).first()
    if user:

      cash = request.json['cash']
      user.cash = cash
      db.session.commit()

      return f"Cash updated to ${cash}.", 200
    
    else:

      return "Portfolio not found!", 404
    
@api.route('/get_stock_data/<id>')
class GetStockData(Resource):
  def get(self, id):

    stock = Stock.query.filter_by(id=id).first()
    if stock:

      stock_data = {
        'id': stock.id,
        'portfolio_id': stock.portfolio_id,
        'symbol': stock.symbol,
        'shares': stock.shares,
        'cost': stock.cost,
      }

      return stock_data, 200
    
    else:

      return "Stock not found!", 404
            
@api.route('/buy_stock/<user_id>')
class BuyStock(Resource):
  def post(self, user_id):

      portfolio = Portfolio.query.filter_by(user_id=user_id).first()
      if portfolio:

        symbol = request.json['symbol']
        shares = request.json['shares']
        stock = Stock.query.filter_by(portfolio_id=portfolio.id, symbol=symbol).first()
          
        if stock:
          stock.shares += shares
          db.session.commit()
          return f"Bought {shares} shares of {symbol}.", 200
        
        else:
          new_stock = Stock(portfolio_id=portfolio.id, symbol=symbol, shares=shares)
          db.session.add(new_stock)
          db.session.commit()
          return f"Bought {shares} shares of {symbol}.", 200
        
@api.route('sell_stock/<user_id>')
class SellStock(Resource):
  def post(self, user_id):

    portfolio = Portfolio.query.filter_by(user_id=user_id).first()
    if portfolio:

      symbol = request.json['symbol']
      shares = request.json['shares']
      stock = Stock.query.filter_by(portfolio_id=portfolio.id, symbol=symbol).first()

      if stock:
            if stock.shares >= shares:
              stock.shares -= shares
              db.session.commit()
              if stock.shares == 0:
                db.session.delete(stock)
                db.session.commit()
              return f"Sold {shares} shares of {symbol}.", 200
            
            else:
              return f"You don't have enough shares of {symbol} to sell!", 400
      else:
        return f"You don't have any shares of {symbol} to sell!", 400
      