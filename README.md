# 概要

このページは、公立諏訪東京理科大学尾崎研究室の３年ゼミでの
Reactの勉強のためのページです。

# 環境構築手順
最初に1度だけ実行する. 2回目以降は必要ない.
1. 番号のフォルダを作る  
`mkdir t122xxx`
2. コンテナをビルドする  
`docker compose build`
3. アプリケーションを作成  
`docker compose run --rm t122xxx sh -c 'npx -y create-react-app react-app'`
4. コンテナを立ち上げる  
`docker compose up -d`

# 使用方法
`localhost:300x`にアクセスする.
以下番号とポートの対応
- t122004: 3001
- t122060: 3002
- t122104: 3003
- t122152: 3004
