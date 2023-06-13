from flask import Blueprint, request, jsonify
from server.src import db
from server.src.models import User

main = Blueprint('main', __name__)

@main.route('/user', methods=['POST'])
def create_user():
  data = request.get_json()
  new_user = User(email=data['email'], password=data['password'])
  db.session.add(new_user)
  db.session.commit()

  return jsonify({'message': 'New user created!'}
)