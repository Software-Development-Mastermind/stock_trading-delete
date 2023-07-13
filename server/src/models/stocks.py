from src import db

class Stock(db.Model):
  __tablename__ = 'stocks'
  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  symbol = db.Column(db.String(10), nullable = False)
  shares = db.Column(db.Integer, nullable = False)
  cost = db.Column(db.Float, nullable = False)