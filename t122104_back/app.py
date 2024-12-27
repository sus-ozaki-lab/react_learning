from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
# React からのリクエストを許可
CORS(app)

# サンプルエンドポイント
@app.route('/api/endpoint', methods=['GET'])
def api_endpoint():
    data = {
         "message": "Hello!!"
    }
    return jsonify(data)

if __name__ == '__main__':
    # サーバーを起動
    app.run(host='0.0.0.0', port=5000)
