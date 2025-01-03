import sqlite3

connection = sqlite3.connect("react_leaning.db")
cursor = connection.cursor()

# テーブルが存在すれば削除
cursor.execute("DROP TABLE IF EXISTS member")
cursor.execute("DROP TABLE IF EXISTS keyType")
cursor.execute("DROP TABLE IF EXISTS keyPlace")
cursor.execute("DROP TABLE IF EXISTS lab")


# テーブルを作成

# 所属研究室テーブル
cursor.execute("""
CREATE TABLE IF NOT EXISTS lab (
    labID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    lab VARCHAR(16) NOT NULL
)
""")


# メンバーテーブル
cursor.execute("""
CREATE TABLE IF NOT EXISTS member (
    memberID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    studentId VARCHAR(7) NOT NULL,
    memberName VARCHAR(32) NOT NULL,
    pass VARCHAR(32) NOT NULL,
    labID INTEGER,
    FOREIGN KEY(labID)
		REFERENCES lab(labID)
		ON DELETE CASCADE 
)
""")

# 鍵の種類テーブル
cursor.execute("""
CREATE TABLE IF NOT EXISTS keyType (
    keyID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(16) NOT NULL,
    labID INTEGER,
    FOREIGN KEY(labID)
		REFERENCES lab(labID)
		ON DELETE CASCADE           
)
""")


# 鍵の場所テーブル

cursor.execute("""
CREATE TABLE IF NOT EXISTS keyPlace (
    keyPlaceID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    time DATETIME NOT NULL,
    place VARCHAR(16) NOT NULL,
    memberID INTEGER,
    keyID INTEGER,
    FOREIGN KEY(memberID)
		REFERENCES member(memberID)
		ON DELETE CASCADE,
    FOREIGN KEY(keyID)
		REFERENCES keyType(keyID)
		ON DELETE CASCADE
)
""")


# データの挿入
cursor.execute("""
INSERT INTO member (studentId, memberName, pass, labID)
    VALUES('T122104', '傳田雪華', '1234', 1)
""")

cursor.execute("""
INSERT INTO keyType (type, labID)
    VALUES('尾崎研究室', 1)
""")

cursor.execute("""
INSERT INTO keyType (type, labID)
    VALUES('404教室',1)
""")

cursor.execute("""
INSERT INTO keyType (type, labID)
    VALUES('602教室',1)
""")

cursor.execute("""
INSERT INTO keyPlace (time, place, memberID, keyID)
    VALUES('2025-01-02 15:00:00', '傳田雪華', 1, 1)
""")

cursor.execute("""
INSERT INTO keyPlace (time, place, memberID, keyID)
    VALUES('2025-01-02 16:00:00', '研究室', 1, 1)
""")

cursor.execute("""
INSERT INTO keyPlace (time, place, memberID, keyID)
    VALUES('2025-01-03 15:00:00', '傳田雪華', 1, 1)
""")

cursor.execute("""
INSERT INTO lab (lab)
    VALUES('尾崎研究室')
""")
cursor.execute("""
INSERT INTO lab (lab)
    VALUES('広瀬研究室')
""")

connection.commit()

# データの表示
cursor.execute("SELECT * FROM member")
rows = cursor.fetchall()
for row in rows:
    print(row)

cursor.execute("SELECT * FROM keyType")
rows = cursor.fetchall()
for row in rows:
    print(row)

cursor.execute("SELECT * FROM keyPlace")
rows = cursor.fetchall()
for row in rows:
    print(row)

# 接続を閉じる
connection.close()
