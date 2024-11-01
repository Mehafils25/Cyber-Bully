from flask import Flask, render_template, request,jsonify
import joblib

def predict_bully_type(message):
# Load the saved model and vectorizer
    loaded_model = joblib.load('cyberbully_detection_model.pkl')
    loaded_vectorizer = joblib.load('tfidf_vectorizer.pkl')
    
    # Preprocess the input message (lowercasing)
    message = message.lower()
    
    # Transform the message using the loaded vectorizer
    message_tfidf = loaded_vectorizer.transform([message])
    
    # Predict the type of cyberbullying
    prediction = loaded_model.predict(message_tfidf)
    
    return prediction[0]

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze',methods=['POST'])
def analyze():
    comment = request.json.get('url')
    response = predict_bully_type(comment)
    return jsonify({'result':response})


if __name__ == '__main__':
    app.run(debug=True)
