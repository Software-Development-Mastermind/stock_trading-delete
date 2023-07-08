from src import db

class Portfolio(db.Model):
  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  symbol = db.Column(db.String(10), nullable = False)
  shares = db.Column(db.Integer, nullable = False)
  cash = db.Column(db.Float, nullable = False)
