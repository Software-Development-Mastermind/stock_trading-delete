from flask import request
from flask_restx import Resource
from flask_jwt_extended import create_access_token

from ..extensions import db
from src.models.users import Users
from src.models.portfolios import Portfolios
from src import api

@api.route('/create_user')
class CreateNewUser(Resource):
  def post(self):

    email = request.json['email']
    password = request.json['password']

    existing_user = Users.query.filter_by(email=email).first()
    if existing_user:
      return "A user with that email aleady exists!", 409

    new_user = Users(email=email, password=password)
    new_portfolio = Portfolios(user_id=new_user.id, cash=100000)
    db.session.add(new_user, new_portfolio)
    db.session.commit()

    return "New user created!", 201

@api.route('/authenticate')
class AuthenticateUser(Resource):
  def post(self):
    
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
    

