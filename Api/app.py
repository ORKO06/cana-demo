import flask
import pickle
import pandas as pd

# Use pickle to load in the pre-trained model
with open(f'model/final_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Initialise the Flask app
app = flask.Flask(__name__, template_folder='templates')

# Set up the main route
@app.route('/', methods=['GET', 'POST'])
def main():
    if flask.request.method == 'GET':
        # Just render the initial form, to get input
        return(flask.render_template('main.html'))
    
    if flask.request.method == 'POST':
        # Extract the input
        N_Default_L3m=flask.request.form['N_Default_L3m']
        Max_Utilization=flask.request.form['Max_Utilization']
        Max_Perc_Def_Chg_Pending=flask.request.form['Max_Perc_Def_Chg_Pending']
        N_Family_Member=flask.request.form['N_Family_Member']
        N_PosBkt_L3m=flask.request.form['N_PosBkt_L3m']
        Ever_Default_L12M=flask.request.form['Ever_Default_L12M']
        Perc_Paymode_Online=flask.request.form['Perc_Paymode_Online']
        Perc_Repay_Fail=flask.request.form['Perc_Repay_Fail']
        Max_DPD_L3m=flask.request.form['Max_DPD_L3m']
        Perc_Paymode_Cheq_Fail=flask.request.form['Perc_Paymode_Cheq_Fail']
        Age=flask.request.form['Age']
        N_Enq_L9m=flask.request.form['N_Enq_L9m']
        Max_Loan_Balance_Others=flask.request.form['Max_Loan_Balance_Others']
        N_WorkEx_Yr=flask.request.form['N_WorkEx_Yr']
        
        columns = [
            "N_Default_L3m",
            "Max_Utilization",
            "Max_Perc_Def_Chg_Pending",
            "N_Family_Member",
            "N_PosBkt_L3m",
            "Ever_Default_L12M",
            "Perc_Paymode_Online",
            "Perc_Repay_Fail",
            "Max_DPD_L3m",
            "Perc_Paymode_Cheq_Fail",
            "Age",
            "N_Enq_L9m",
            "Max_Loan_Balance_Others",
            "N_WorkEx_Yr",
        ]
        input_variables = pd.DataFrame([[N_Default_L3m, Max_Utilization,Max_Perc_Def_Chg_Pending,
                                        N_Family_Member,N_PosBkt_L3m,Ever_Default_L12M,
                                        Perc_Paymode_Online,Perc_Repay_Fail,Max_DPD_L3m,
                                        Perc_Paymode_Cheq_Fail,Age,N_Enq_L9m,
                                        Max_Loan_Balance_Others,N_WorkEx_Yr]],
                                    columns=columns,
                                    dtype=float)
        prediction = model.predict_proba(input_variables)[:, 1]
    
        # Render the form again, but add in the prediction and remind user
        # of the values they input before
        return flask.render_template('main.html',
                             original_input={'N_Default_L3m': N_Default_L3m,
                                             'Max_Utilization': Max_Utilization,
                                             'Max_Perc_Def_Chg_Pending': Max_Perc_Def_Chg_Pending,
                                             'N_Family_Member': N_Family_Member,
                                             'N_PosBkt_L3m': N_PosBkt_L3m,
                                             'Ever_Default_L12M': Ever_Default_L12M,
                                             'Perc_Paymode_Online': Perc_Paymode_Online,
                                             'Perc_Repay_Fail': Perc_Repay_Fail,
                                             'Max_DPD_L3m': Max_DPD_L3m,
                                             'Perc_Paymode_Cheq_Fail': Perc_Paymode_Cheq_Fail,
                                             'Age': Age,
                                             'N_Enq_L9m': N_Enq_L9m,
                                             'Max_Loan_Balance_Others': Max_Loan_Balance_Others,
                                             'N_WorkEx_Yr': N_WorkEx_Yr},
                             result=prediction)


if __name__ == '__main__':
    app.run()
# from flask import Flask, request, jsonify
# import joblib  # Assuming you're using scikit-learn and have a .pkl file
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)


# # Load the machine learning model
# model = joblib.load("model.pkl")

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json(force=True)

#     # Print or log the received data
#     print("Received data:", data)

#     features = data['features']  # Adjust this based on your model's input format


    
#     # prediction = bagging_clf.predict_proba(input_variables)[:, 1]
#     # prediction
#     # Make predictions using the loaded model
#     prediction = model.predict(input_variables)
#     print("Received data:", predictions)

#     # Format the response as needed
#     result = {'prediction': prediction.tolist()}

#     return jsonify(result)

# if __name__ == '__main__':
#     app.run(port=5000)
