    rows = cursor.fetchall()  # 行を取得
    data = {
        "message": [dict(row) for row in rows]  # 行を辞書形式で返す
    }
    connection.close()  # 接続を閉じる