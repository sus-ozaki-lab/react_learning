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


# 履歴を取得するエンドポイント
@app.route('/home/<lab>/history', methods=['GET'])
def get_history(lab):
    try:
        # データベース接続
        conn = get_db_connection()
        cursor = conn.cursor()

        # labIDを取得
        cursor.execute("SELECT labID FROM lab WHERE lab = ?", (lab,))
        lab_data = cursor.fetchone()

        if not lab_data:
            return jsonify({"error": f"Lab '{lab}' not found"}), 404

        lab_id = lab_data["labID"]

        # 履歴を取得
        cursor.execute("""
            SELECT h.updateTime, m.memberName
            FROM history h
            JOIN member m ON h.updatedBy = m.memberID
            WHERE h.labID = ?
            ORDER BY h.updateTime DESC
        """, (lab_id,))

        history_data = cursor.fetchall()
        conn.close()

        # 履歴をJSON形式で返す
        if history_data:
            history_list = [
                {"time": record["updateTime"], "updatedBy": record["memberName"]}
                for record in history_data
            ]
            return jsonify(history_list)
        else:
            return jsonify({"message": "履歴が見つかりませんでした"}), 404

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "内部サーバーエラー"}), 500


if __name__ == '__main__':
    # サーバーを起動
    app.run(host='0.0.0.0', port=5000)