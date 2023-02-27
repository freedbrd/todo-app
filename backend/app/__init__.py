from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from .config import Config


app = Flask(__name__)
app.config.from_object(Config)
CORS(app, origins=["http://localhost:4200"])

mongo = PyMongo(app)

from app import views
from app.errors import bad_request_error
