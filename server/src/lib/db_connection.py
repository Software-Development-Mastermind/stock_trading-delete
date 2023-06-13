import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv; load_dotenv()

class DBConnection:
  
  def __init__(self) -> None:
    self.params = os.getenv('DB_CONNECTION_STRING')
    self.conn = psycopg2.connect(self.params)
    self.cursor = self.conn.cursor(cursor_factory=RealDictCursor)

  def add_user(self, email, password):
    try:
      query = "SELECT 1 FROM users WHERE email = %s"
      self.cursor.execute(query, (email,))
      exists = self.cursor.fetchone()

      if exists:
        return False
      
      else:
        query = "INSERT INTO users (email, password) VALUES (%s, %s)"
        self.cursor.execute(query, (email, password))
        self.conn.commit()
    
    except (Exception, psycopg2.DatabaseErrorError) as error:
      print(error)
      return False

    return True
  
  def authenticate_user(self, email, password):
    try:
      query = "SELECT 1 FROM users WHERE email = %s AND password = %s"
      self.cursor.execute(query, (email, password))
      exists = self.cursor.fetchone()

      if exists:
        return True
      
      else:
        return False
    
    except (Exception, psycopg2.DatabaseErrorError) as error:
      print(error)
      return False

    

db_connection = DBConnection()

print(db_connection.authenticate_user('test@gmail.com', 'test123'))