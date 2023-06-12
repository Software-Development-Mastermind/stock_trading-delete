import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv; load_dotenv()

class DBConnection:
  
  def __init__(self) -> None:
    self.params = os.getenv('DB_CONNECTION_STRING')
    self.conn = psycopg2.connect(self.params)
    self.cursor = self.conn.cursor(cursor_factory=RealDictCursor)