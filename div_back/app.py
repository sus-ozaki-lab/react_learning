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


# 鍵の種類の選択
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

# 鍵の種類を取得するエンドポイント
@app.route('/home/<lab>/keyType', methods=['GET'])
def get_key_type(lab):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # labIDを取得するためにlabsテーブルから情報を取得
        cursor.execute("SELECT labID FROM lab WHERE lab = ?", (lab,))
        lab_data = cursor.fetchone()

        if not lab_data:
            return jsonify({"error": f"Lab '{lab}' not found"}), 404  # lab名が見つからない場合のエラーメッセージ

        lab_id = lab_data["labID"]

        # 鍵の種類情報を取得するクエリ
        cursor.execute("""
            SELECT keyID, type FROM keyType WHERE labID = ?
        """, (lab_id,))

        keys_data = cursor.fetchall()

        if keys_data:
            keys_list = [
                {
                    "keyID": record["keyID"],
                    "type": record["type"]
                }
                for record in keys_data
            ]
            return jsonify(keys_list)
        else:
            return jsonify({"message": "鍵の種類が見つかりませんでした"}), 404
        
    except Exception as e:
        print("Error:", e)  # ログにエラーを出力
        return jsonify({"error": "内部サーバーエラー"}), 500


# 鍵の詳細情報を取得するエンドポイント
@app.route('/home/<lab>/place', methods=['GET'])
def get_key_details(lab):
    key_id = request.args.get("keyID", type=int)
    
    # labを数字のlabIDに変換（例えば、'尾崎研究室' -> 1）
    lab_ids = {"尾崎研究室": 1, "広瀬研究室": 2}
    lab_id = lab_ids.get(lab)
    
    if not lab_id:
        return jsonify({"message": f"Invalid lab: {lab}"}), 400  # labIDが無効な場合
    
    # データベース接続
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # SQLクエリを実行 (最新の1件のみ取得)
    query = """
    SELECT kp.place, m.memberName, kp.time 
    FROM keyPlace kp 
    JOIN member m ON kp.memberID = m.memberID 
    WHERE kp.keyID = ? AND m.labID = ?
    ORDER BY kp.time DESC 
    LIMIT 1
    """
    
    cursor.execute(query, (key_id, lab_id))
    result = cursor.fetchone()  # 最新の1件を取得
    
    conn.close()  # 接続を閉じる
    
    if result:
        return jsonify({
            "place": result[0],
            "memberName": result[1],
            "time": result[2]
        })
    else:
        return jsonify({"message": "鍵の詳細が見つかりませんでした", "lab": lab, "keyID": key_id}), 404


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