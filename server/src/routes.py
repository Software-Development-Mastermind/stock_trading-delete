from flask import Blueprint, request
from flask_jwt_extended import create_access_token

from .extensions import db
from src.models.users import Users
from src.lib.finnhub_api import finnhub_api
from src.lib.fmp_api import fmp_api

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
    access_token = create_access_token(identity=email)
    successful_auth_response = {'access_token': access_token, 'message': 'User authenticated!'}
    return successful_auth_response, 200
  
  else:
    valid_email = Users.query.filter_by(email=email).first()
    if valid_email:
      return "Invalid password!", 401
    else:
      return "Invalid email!", 401
  
@api.route('/stock_search/<search>', methods=['GET'])
def stock_search(search):
  res = fmp_api.get_company_info(search)
  return res, 200

