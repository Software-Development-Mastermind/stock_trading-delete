from flask import Blueprint, request, jsonify
from .extensions import db
from src.models.users import Users

main = Blueprint('main', __name__)

@main.route('/users', methods=['POST'])
def create_user():
  data = request.get_json()
  email = data['email']

# Check if user already exists. If so, return 409 status code - conflict.

  existing_user = Users.query.filter_by(email=email).first()
  if existing_user:
    return "A user with that email aleady exists!", 409

  new_user = Users(email=data['email'], password=data['password'])
  db.session.add(new_user)
  db.session.commit()

  return "New user created!", 201
