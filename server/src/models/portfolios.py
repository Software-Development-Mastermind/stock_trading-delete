from src import db

class Portfolio(db.Model):
  __tablename__ = 'portfolios'
  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = True)
  stocks = db.relationship('Stock', backref = 'portfolio', lazy = True)
  cash = db.Column(db.Float, nullable = False)

class Stock(db.Model):
  __tablename__ = 'stocks'
  id = db.Column(db.Integer, primary_key = True)
  portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolios.id'), nullable = False)
  symbol = db.Column(db.String(10), nullable = False)
  shares = db.Column(db.Integer, nullable = False)
  cost = db.Column(db.Float, nullable = False)