import flask
import joblib
import pandas as pd
import flask_cors
from flask import request, jsonify, make_response

# Use pickle to load in the pre-trained model.
# Have a folder model and inside that have the pkl file loaded
# with open(f'model.pkl', 'rb') as f:
# model = pickle.load(f)

model = joblib.load('final_model.joblib')

print(type(model))

# Initialise the Flask app
app = flask.Flask(__name__, template_folder='templates')
flask_cors.CORS(
    app, resources={r'/*': {'origins': '*'}}, supports_credentials=True)


@app.route('/')
def mai():
    response = make_response("Hello", 200)

    return response

# Set up the main route


@app.route('/re', methods=['GET', 'POST'])
def main():

    # if flask.request.method == 'GET':
    #     # Just render the initial form, to get input
    #     response = make_response("Hellod", 200)
    #     return response

    if flask.request.method == 'POST':
        # data = request.get_json()
        # print(data)
        # 3.0	38	100.0	5	0.0	1	0.285714	0.428571	19.0	0.750000	46	0	5527.0	15
        N_Default_L3m = 2
        Max_Utilization = 100
        Max_Perc_Def_Chg_Pending = 100
        N_Family_Member = 1
        N_PosBkt_L3m = 0
        Ever_Default_L12M = 1
        Perc_Paymode_Online = 0.333333333
        Perc_Repay_Fail = 0.333333333
        Max_DPD_L3m = 19
        Perc_Paymode_Cheq_Fail = 0.5
        Age = 24
        N_Enq_L9m = 0
        Max_Loan_Balance_Others = 55384
        N_WorkEx_Yr = 4

        Max_DPD_L3m = Max_DPD_L3m*Max_DPD_L3m
        N_Default_L3m = N_Default_L3m*N_Default_L3m
        Perc_Repay_Fail = Perc_Repay_Fail*Perc_Repay_Fail
        Max_Utilization = Max_Utilization*Max_Utilization
        N_WorkEx_Yr = N_WorkEx_Yr*N_WorkEx_Yr

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

        if hasattr(model, 'predict_proba') and callable(getattr(model, 'predict_proba')):
            prediction = model.predict_proba(input_variables)[:, 1]
            response = flask.jsonify({'result': prediction.tolist()})
            response.headers.add('Content-Type', 'application/json')
        else:
            response = flask.jsonify(
                {'error': 'Model does not support predict_proba'})
            response.headers.add('Content-Type', 'application/json')

        # print(getattr(model, 'predict_probability'))
        return response
        # Render the form again, but add in the prediction and remind user
        # of the values they input before

        # Render the form again, but add in the prediction and remind the user
        # of the values they input before
        # return flask.render_template('main.html',
        #                              original_input={'N_Default_L3m': N_Default_L3m,
        #                                              'Max_Utilization': Max_Utilization,
        #                                              'Max_Perc_Def_Chg_Pending': Max_Perc_Def_Chg_Pending,
        #                                              'N_Family_Member': N_Family_Member,
        #                                              'N_PosBkt_L3m': N_PosBkt_L3m,
        #                                              'Ever_Default_L12M': Ever_Default_L12M,
        #                                              'Perc_Paymode_Online': Perc_Paymode_Online,
        #                                              'Perc_Repay_Fail': Perc_Repay_Fail,
        #                                              'Max_DPD_L3m': Max_DPD_L3m,
        #                                              'Perc_Paymode_Cheq_Fail': Perc_Paymode_Cheq_Fail,
        #                                              'Age': Age,
        #                                              'N_Enq_L9m': N_Enq_L9m,
        #                                              'Max_Loan_Balance_Others': Max_Loan_Balance_Others,
        #                                              'N_WorkEx_Yr': N_WorkEx_Yr},
        #                              result=prediction)


if __name__ == '__main__':
    app.run(debug=True)
