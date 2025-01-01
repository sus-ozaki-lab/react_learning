# Pythonのベースイメージ
FROM python:3.9

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストール
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションコードをコピー
COPY . .

# Flaskアプリケーションのポートを公開
EXPOSE 5000

# Flaskアプリを起動
CMD ["python", "app.py"]
