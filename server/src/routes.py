from flask import Blueprint, request, jsonify
from .extensions import db
from src.models.users import Users

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/users', methods=['POST'])
def create_user():
  data = request.get_json()
  email = data['email']

  existing_user = Users.query.filter_by(email=email).first()
  if existing_user:
    return "A user with that email aleady exists!", 409

  new_user = Users(email=data['email'], password=data['password'])
  db.session.add(new_user)
  db.session.commit()

  return "New user created!", 201

@api.route('/users/authenticate', methods=['POST'])
def authenticate_user():
  data = request.get_json()
  email = data['email']
  password =data['password']

  valid_credentials = Users.query.filter_by(email=email, password=password).first()
  if valid_credentials:
    return "User authenticated!", 200
  
  elif not valid_credentials:
    valid_email = Users.query.filter_by(email=email).first()
    if valid_email:
      return "Invalid password!", 401
    else:
      return "Invalid email!", 401
    


