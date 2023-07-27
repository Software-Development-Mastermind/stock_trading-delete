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

    portfolio_data = []

    if stocks:
      for stock in stocks:
        stocks_data = {
          'id': stock.id,
          'symbol': stock.symbol,
          'name': stock.name,
          'shares': stock.shares,
          'cost': stock.cost,
        }
        portfolio_data.append(stocks_data)

      return portfolio_data, 200
    
    else:

      return [], 200
    
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
                
@api.route('/buy_stock/<user_id>')
class BuyStock(Resource):
  def post(self, user_id):
      
    symbol = request.json['symbol']
    name = request.json['name']
    shares = request.json['shares']
    cost = request.json['cost']

    stock = Stock.query.filter_by(user_id=user_id, symbol=symbol).first()
    if stock:
      stock.shares += shares
      stock.cost += cost
      db.session.commit()
      
      return f"Bought {shares} shares of existing stock {symbol} for {cost}.", 200

    else:
      new_stock = Stock(
        user_id=user_id, 
        symbol=symbol, 
        name=name, 
        shares=shares, 
        cost=cost
        )
      db.session.add(new_stock)
      db.session.commit()
      
      return f"Bought {shares} shares of new stock {symbol} for {cost}.", 201
        
@api.route('sell_stock/<user_id>')
class SellStock(Resource):
  def post(self, user_id):

    symbol = request.json['symbol']
    shares = request.json['shares']
    value = request.json['price']

    stock = Stock.query.filter_by(user_id=user_id, symbol=symbol).first()
    if stock:
      if stock.shares >= shares:
        stock.shares -= shares
        stock.cost -= value
        db.session.commit()
        if stock.shares == 0:
          db.session.delete(stock)
          db.session.commit()
        return f"Sold {shares} shares of {symbol} for {value}.", 200
      
      else:
        return f"User does not have enough shares of {symbol} to sell!", 400
        
    else:
        
      return "Stock not found!", 404