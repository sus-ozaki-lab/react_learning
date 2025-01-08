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
# 

@app.route('/keyPlace/lab/selectType', methods=['GET'])
def selectType():
    connection = get_db_connection()  # 接続を開く
    cursor = connection.cursor()

    # クエリ実行
    cursor.execute("""SELECT type FROM keyType""")
    rows = cursor.fetchall()  # すべてのデータを取得

    # rowsから場所のリストを作成
    types = [row['type'] for row in rows]  

    # データを返す
    data = {
        "types": types  # placesリストを返す
    }

    connection.close()  # 接続を閉じる
    return jsonify(data)  # JSONで返す


if __name__ == '__main__':
    # サーバーを起動
    app.run(host='0.0.0.0', port=5000)