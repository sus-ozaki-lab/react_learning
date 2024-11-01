# ベースイメージの指定
FROM node:lts

# 作業ディレクトリの指定
WORKDIR /usr/src/app/

# システムのアップデート・アップグレード
RUN apt-get update && apt-get upgrade -y

# ポートの公開
EXPOSE 3000