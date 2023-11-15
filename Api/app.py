from flask import Flask, request, jsonify
import joblib  # Assuming you're using scikit-learn and have a .pkl file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Load the machine learning model
model = joblib.load("model.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)

    # Print or log the received data
    print("Received data:", data)

    features = data['features']  # Adjust this based on your model's input format


    
    # prediction = bagging_clf.predict_proba(input_variables)[:, 1]
    # prediction
    # Make predictions using the loaded model
    prediction = model.predict(input_variables)
    print("Received data:", predictions)

    # Format the response as needed
    result = {'prediction': prediction.tolist()}

    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000)
