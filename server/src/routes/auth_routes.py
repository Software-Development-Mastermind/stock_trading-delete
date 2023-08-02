from flask import request
from flask_restx import Resource
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import IntegrityError

from ..extensions import db
from src.models.users import User
from src.models.stocks import Stock
from src import api

@api.route('/create_user')
class CreateNewUser(Resource):
  def post(self):

    try:

      inspector = db.inspect(db.engine)
      existing_tables = inspector.get_table_names()

      if 'users' not in existing_tables:
        User.__table__.create(db.engine)

      if 'stocks' not in existing_tables:
        Stock.__table__.create(db.engine)

      email = request.json['email']
      password = request.json['password']
    
      new_user = User(email=email, password=password, cash=100000.00)
      db.session.add(new_user)
      db.session.commit()

      return 201
    
    except IntegrityError:
      db.session.rollback()
      return "User already exists!", 409
    
    except Exception as e:
      db.session.rollback()
      return str(e), 500

@api.route('/authenticate')
class AuthenticateUser(Resource):
  def post(self):

    email = request.json['email']
    password = request.json['password']

    valid_credentials = User.query.filter_by(email=email, password=password).first()
    
    if valid_credentials:
      access_token = create_access_token(identity=email)
      successful_auth_response = {'access_token': access_token, 'message': 'User authenticated!'}
      return successful_auth_response, 200
    
    else:
      valid_email = User.query.filter_by(email=email).first()
      if valid_email:
        return "Invalid password!", 401
      else:
        return "Invalid email!", 401
      
@api.route('/get_user_id/<email>')
class GetUserId(Resource):
  def get(self, email):

    user = User.query.filter_by(email=email).first()

    if user:

      user_id = user.id
      return user_id, 200
    
    else:

      return "User not found!", 404
    
@api.route('/get_user_password/<user_id>')
class GetUserPassword(Resource):
  def get(self, user_id):

    user = User.query.filter_by(id=user_id).first()

    if user:

      user_password = len(user.password)
      return user_password, 200
    
    else:

      return "User not found!", 404
  
    

