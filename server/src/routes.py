from flask import Blueprint, request, jsonify
from .extensions import db
from src.models.users import Users

main = Blueprint('main', __name__)

@main.route('/users', methods=['POST'])
def create_user():
  data = request.get_json()
  new_user = Users(email=data['email'], password=data['password'])
  db.session.add(new_user)
  db.session.commit()

  return "New user created!"
