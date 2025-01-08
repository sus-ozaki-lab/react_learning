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


# 鍵の場所の選択
@app.route('/keyPlace/lab/selectPlace', methods=['GET'])
def selectPlace():
    connection = get_db_connection()  # 接続を開く
    cursor = connection.cursor()

    # クエリ実行
    cursor.execute("""SELECT DISTINCT place FROM keyPlace""")
    rows = cursor.fetchall()  # すべてのデータを取得

    # rowsから場所のリストを作成
    places = [row['place'] for row in rows]  # SQLiteの行を辞書形式で取得するためには row_factory を設定しておく必要がある

    # データを返す
    data = {
        "places": places  # placesリストを返す
    }

    connection.close()  # 接続を閉じる
    return jsonify(data)  # JSONで返す


if __name__ == '__main__':
    # サーバーを起動
    app.run(host='0.0.0.0', port=5000)