# download NLTK data
import nltk
nltk.download('punkt')
nltk.download('punkt_tab')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
nltk.download('averaged_perceptron_tagger_eng')

# import libraries
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
from utils import preprocess

# define backend server
app = FastAPI()

# configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_methods=['*'],
    allow_headers=['*'],
)

# define BaseModel
class MessageInput(BaseModel):
    message: str

# load model and vectorizer
model = joblib.load('model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

# GET /
@app.get('/')
def home():
    return {
        'message': 'Server running...🚀'
    }

# POST /predict
@app.post('/predict')
def classify(input: MessageInput):
    vector_message = vectorizer.transform([preprocess(input.message)]) # vectorize message
    prediction = model.predict(vector_message)[0] # predict class (0: ham, 1: spam)

    return {
        'class': 'Ham' if prediction == 0 else 'Spam'
    }