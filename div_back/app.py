from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# データベース接続
def get_db_connection():
    conn = sqlite3.connect('database.db')  # DBファイルを指定
    conn.row_factory = sqlite3.Row
    return conn

# ログイン
@app.route('/login', methods=['POST'])
def login():
    # 情報を取得
    data = request.get_json()
    member_name = data['memberName']
    password = data['password']
    
    # データベース接続
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # memberNameとパスワードを検証
    cursor.execute("SELECT * FROM member WHERE memberName = ?", (member_name,))
    user = cursor.fetchone()


    if user and user['password'] == password:  
        return jsonify({"message": "Login successful", "memberID": user['memberID']}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

# ログアウトエンドポイント
@app.route('/logout', methods=['POST'])
def logout():
    # ログアウト処理
    return jsonify({"message": "ログアウト成功"}), 200

# アプリケーション起動
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
