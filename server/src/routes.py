from flask import Blueprint, request
from .extensions import db
from src.models.users import Users

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/users', methods=['POST'])
def create_user():
  email = request.json['email']
  password = request.json['password']

  existing_user = Users.query.filter_by(email=email).first()
  if existing_user:
    return "A user with that email aleady exists!", 409

  new_user = Users(email=email, password=password)
  db.session.add(new_user)
  db.session.commit()

  return "New user created!", 201

@api.route('/authenticate', methods=['POST'])
def authenticate_user():
  email = request.json['email']
  password = request.json['password']

  valid_credentials = Users.query.filter_by(email=email, password=password).first()
  if valid_credentials:
    return "User authenticated!", 200
  
  else:
    valid_email = Users.query.filter_by(email=email).first()
    if valid_email:
      return "Invalid password!", 401
    else:
      return "Invalid email!", 401
    


