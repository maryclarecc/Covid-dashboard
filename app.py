from flask import Flask, render_template, jsonify
import pandas as pd
import sqlite3

conn = sqlite3.connect("Resources/covid_dashboard.sqlite", check_same_thread=False) 

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/data_stacked_bar")
def data1():
    data1 = pd.read_sql('SELECT * FROM VaccineState',con =conn)
    return jsonify(data1.to_dict())

@app.route("/data_map")
def data2():
    data2 = pd.read_sql('SELECT * FROM VaccineStateYearEnd',con=conn)
    return jsonify(data2.to_dict())

@app.route("/data_line")
def data3():
    data3 = pd.read_sql('SELECT * FROM VaccineUS',con = conn)
    return jsonify(data3.to_dict())

if __name__ == "__main__":
    app.run(debug=True)