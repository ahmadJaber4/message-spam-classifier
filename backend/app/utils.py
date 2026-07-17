# import libraries
import re
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import wordnet
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

# define stop words
stop_words = stopwords.words('english')

# define lemmatizer
lemmatizer = WordNetLemmatizer()

# wordnet POS function
def get_wordnet_pos(pos_tag):
    first_letter = pos_tag[0]

    if first_letter == 'J':
        return wordnet.ADJ
    elif first_letter == 'V':
        return wordnet.VERB
    elif first_letter == 'R':
        return wordnet.ADV
    else:
        return wordnet.NOUN

# text cleaning function
def preprocess(message):
    message = message.lower() # lowercase
    message = re.sub(r'[^A-Za-z]', ' ', message) # remove punctuation, numbers, and special characters
    message = word_tokenize(message) # tokenization
    message = [word for word in message if word not in stop_words] # remove stop words
    message = [lemmatizer.lemmatize(word, get_wordnet_pos(tag)) for (word, tag) in nltk.pos_tag(message)] # lemmatization
    message = ' '.join(message)

    return message
