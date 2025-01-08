from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from datetime import datetime

app = Flask(__name__)
# React からのリクエストを許可
CORS(app)

# データベース接続関数
def get_db_connection():
    connection = sqlite3.connect("react_leaning.db")
    connection.row_factory = sqlite3.Row  # row_factoryを設定して、結果を辞書形式で取得
    return connection

lab = "尾崎研究室"
member = 1
# 現在の鍵の場所の表示

@app.route('/keyPlace/lab/show', methods=['GET'])
def show():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("""
        SELECT kp.time, kp.place, kt.type, m.memberName
        FROM keyPlace kp
        JOIN keyType kt ON kp.keyID = kt.keyID
        JOIN member m ON kp.memberID = m.memberID
        WHERE kt.labID = (SELECT labID FROM lab WHERE lab = ?)  
        AND kp.time IN (
            SELECT MAX(time)
            FROM keyPlace
            WHERE keyID IN (
                SELECT keyID 
                FROM keyType 
                WHERE labID = (SELECT labID FROM lab WHERE lab = ?)
            )
            GROUP BY keyID
        )
        ORDER BY kp.time DESC
    """, (lab, lab))  # labNameを条件に2回使用

    rows = cursor.fetchall()  # クエリの結果を取得


    data = [dict(row) for row in rows]

    connection.close()  # 接続を閉じる
    return jsonify(data)

if __name__ == '__main__':
    # サーバーを起動
    app.run(host='0.0.0.0', port=5000)