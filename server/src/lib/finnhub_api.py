import requests
import os

from dotenv import load_dotenv; load_dotenv()

class FinnhubAPI:

  def __init__(self) -> None:
    self.session = requests.Session()
    self.session.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Finnhub-Token': os.getenv('FINNHUB_API_KEY')
        }
    self.base_url = 'https://finnhub.io/api/v1/'
    self.quote_url = self.base_url + 'quote?symbol='
    self.financials_url = self.base_url + 'stock/metric?symbol='

  def get_company_name(self, symbol):
    url = self.company_url + symbol
    res = self.session.get(url)
    return res.json()['name']

  def get_quote(self, symbol):
    url = self.quote_url + symbol
    res = self.session.get(url)
    return res.json()
  
  def get_financials(self, symbol):
    url = self.financials_url + symbol
    res = self.session.get(url)
    return res.json()
    
finnhub_api = FinnhubAPI()
