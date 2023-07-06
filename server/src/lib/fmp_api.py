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
       'limit': 10,
        }
    self.base_url = 'https://financialmodelingprep.com/api/v3/'
    self.name_search_url = self.base_url + 'search-name?query='
    self.api_key = os.getenv('FMP_API_KEY')
    self.api_key_url = '&apikey=' + self.api_key
  
  def search_by_name(self, company_name):
      url = self.name_search_url + company_name + self.api_key_url
      res = self.session.get(url, params = self.search_params)
      return res.json()
  
fmp_api = FMP_API()
