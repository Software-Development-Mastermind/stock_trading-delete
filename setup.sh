#!/user/bin/env bash

# Exit on error
set -o errexit

## CLIENT SETUP
cd client
npm i 

## ENV SETUP
cd ..
touch .env

echo "Enter your PostgresSQL host (default is localhost)":
read host
host = ${host:="localhost"}

echo "Enter your PostgresSQL username (default is postgres)":
read username
host = ${username:="postgres"}

echo "Enter your PostgresSQL username (default is postgres)":
read password
host = ${password:="postgres"}

echo "Enter your postgres db name (default is stock_app)":
read db_name
host = ${db_name:="stock_app"}

while [[ -z "$finnhub_api_key" ]]; do
  read -p "Enter your Finnhub API key: " finnhub_api_key
done

while [[ -z "$fmp_api_key" ]]; do
  read -p "Enter your FMP API key: " fmp_api_key
done

echo "DB_CONNECTION_STRING = 'postgressqql+psycopg2://$username:$password@$host/$db_name'" > .env
echo "SECRET_KEY = 'terces'" >> .env
echo "FINNHUB_API_KEY = '$finnhub_api_key'" >> .env`
echo "FMP_API_KEY = '$fmp_api_key'" >> .env`

## SERVER SETUP
cd server
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 main.py