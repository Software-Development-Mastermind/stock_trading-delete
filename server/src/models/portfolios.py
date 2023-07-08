from src import db

class Portfolios(db.Model):
  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  stocks = db.relationship('Stock', backref = 'portfolio', lazy = True)
  cash = db.Column(db.Float, nullable = False)

class Stocks(db.Model):
  id = db.Column(db.Integer, primary_key = True)
  portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolio.id'), nullable = False)
  symbol = db.Column(db.String(10), nullable = False)
  shares = db.Column(db.Integer, nullable = False)