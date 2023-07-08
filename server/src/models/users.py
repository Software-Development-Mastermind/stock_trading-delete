from src import db

class Users(db.Model):
  id = db.Column(db.Integer, primary_key = True)
  email = db.Column(db.String(30), nullable = False, unique = True)
  password = db.Column(db.String(30), nullable = False)

class Portfolio(db.Model):
  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  symbol = db.Column(db.String(10), nullable = False)
  shares = db.Column(db.Integer, nullable = False)
  cash = db.Column(db.Float, nullable = False)
