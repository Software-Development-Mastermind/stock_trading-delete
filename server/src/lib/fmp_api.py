import requests
import os

from dotenv import load_dotenv; load_dotenv()

class FMP_API:

  def __init__(self) -> None:
    self.session = requests.Session()
    self.session.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        }
    self.search_params = {
       'count': 5,
        }
    self.base_url = 'https://financialmodelingprep.com/api/v3/'
    self.ticker_url = self.base_url + 'search-name?query='
    self.api_key = os.getenv('FMP_API_KEY')
    self.api_key_url = '&apikey=' + self.api_key
  
  def get_ticker(self, symbol):
      url = self.ticker_url + symbol + self.api_key_url
      res = self.session.get(url, params = self.search_params)
      return res.json()
  
fmp_api = FMP_API()
print(fmp_api.api_key)
print(fmp_api.get_ticker('AAPL'))