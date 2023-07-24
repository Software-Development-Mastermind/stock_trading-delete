from flask_restx import Resource
from flask import request

from src.lib.finnhub_api import finnhub_api
from src.lib.fmp_api import fmp_api
from src import api

@api.route('/company_search/<search>')
class SearchByCompany(Resource):
  def get(self, search):
    res = fmp_api.search_by_name(search)
    return res, 200

@api.route('/ticker_search/<symbol>')
class SearchByTicker(Resource):
  def get(self, symbol):
    res = finnhub_api.search_by_ticker(symbol)
    return res, 200

@api.route('/stock_quote/<symbol>')
class GetStockQuote(Resource):
  def get(self, symbol):
    res = finnhub_api.get_quote(symbol)
    return res, 200

@api.route('/stock_financials/<symbol>')
class GetStockFinancials(Resource):
  def get(self, symbol):
    res = finnhub_api.get_financials(symbol)
    return res, 200
  
@api.route('/candles/<symbol>')
class GetCandles(Resource):
  def get(self, symbol):

    resolution = request.args.get('resolution')
    from_date = request.args.get('from_date')
    to_date = request.args.get('to_date')

    res = finnhub_api.get_candles(symbol, resolution, from_date, to_date)
    return res, 200