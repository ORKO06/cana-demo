import flask
import pickle
import pandas as pd
import flask_cors
from flask import request, jsonify

# Use pickle to load in the pre-trained model.
# Have a folder model and inside that have the pkl file loaded
with open(f'model.pkl', 'rb') as f:
    model = pickle.load(f)

# Initialise the Flask app
app = flask.Flask(__name__, template_folder='templates')
flask_cors.CORS(
    app, resources={r'/*': {'origins': '*'}}, supports_credentials=True)


# Set up the main route
@app.route('/re', methods=['GET', 'POST'])
def main():
    if flask.request.method == 'OPTIONS':
        response = flask.Response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    if flask.request.method == 'GET':
        # Just render the initial form, to get input
        return (flask.render_template('main.html'))

    if flask.request.method == 'POST':
        data = request.get_json()
        N_Default_L3m = data['N_Default_L3m'].value
        Max_Utilization = data['Max_Utilization'].value
        Max_Perc_Def_Chg_Pending = data['Max_Perc_Def_Chg_Pending'].value
        N_Family_Member = data['N_Family_Member'].value
        N_PosBkt_L3m = data['N_PosBkt_L3m'].value
        Ever_Default_L12M = data['Ever_Default_L12M'].value
        Perc_Paymode_Online = data['Perc_Paymode_Online'].value
        Perc_Repay_Fail = data['Perc_Repay_Fail'].value
        Max_DPD_L3m = data['Max_DPD_L3m'].value
        Perc_Paymode_Cheq_Fail = data['Perc_Paymode_Cheq_Fail'].value
        Age = data['Age'].value
        N_Enq_L9m = data['N_Enq_L9m'].value
        Max_Loan_Balance_Others = data['Max_Loan_Balance_Others'].value
        N_WorkEx_Yr = data['N_WorkEx_Yr'].value

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
        input_variables = pd.DataFrame([[N_Default_L3m, Max_Utilization, Max_Perc_Def_Chg_Pending,
                                        N_Family_Member, N_PosBkt_L3m, Ever_Default_L12M,
                                        Perc_Paymode_Online, Perc_Repay_Fail, Max_DPD_L3m,
                                        Perc_Paymode_Cheq_Fail, Age, N_Enq_L9m,
                                        Max_Loan_Balance_Others, N_WorkEx_Yr]],
                                       columns=columns,
                                       dtype=float)
        prediction = model.predict_proba(input_variables)[:, 1]

        # Render the form again, but add in the prediction and remind user
        # of the values they input before
        # response = flask.jsonify({'result': prediction.tolist()})
        # response.headers.add('Access-Control-Allow-Origin', '*')
        # response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        # response.headers.add('Access-Control-Allow-Methods', 'POST')

        # Render the form again, but add in the prediction and remind the user
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
