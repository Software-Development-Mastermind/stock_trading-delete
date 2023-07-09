from src import db

class User(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key = True)
  email = db.Column(db.String(30), nullable = False, unique = True)
  password = db.Column(db.String(30), nullable = False)
