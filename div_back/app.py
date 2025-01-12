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

# 決定ボタン
@app.route('/keyPlace/lab/submit', methods=['POST'])
def submit():
    data = request.get_json()

    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # 現在の時刻をフォーマット
    place = data.get("place")
    selected_type = data.get("type")

    connection = get_db_connection()  # 接続を開く
    cursor = connection.cursor()

    #鍵の種類からkeyIDを取得
    cursor.execute("SELECT keyID FROM keyType WHERE type = ?", (selected_type,))
    key_type_row = cursor.fetchone()

    key_id = key_type_row['keyID']

    cursor.execute(""" 
            INSERT INTO keyPlace (time, place, keyID, memberID) 
            VALUES (?, ?, ?, ?)
        """, (current_time, place, key_id, 1))  # memberID は仮の値 1 にしています
    connection.commit()  # 変更をコミット
    connection.close()

    return jsonify({"message": "データが正常に送信されました"}), 200

if __name__ == '__main__':
    # サーバーを起動
    app.run(host='0.0.0.0', port=5000)