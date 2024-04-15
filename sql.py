import mysql.connector

conn = mysql.connector.connect(
  host="127.0.0.1",
  user="root",
  password="1234",
  database='kb-project'
)

cursor = conn.cursor()

# SQL statement สำหรับ insert ข้อมูล
insert_sql = "INSERT INTO data (`mat_id`, `msg`)   VALUES (%s, %s)"

# Execute SQL statement เพื่อ insert ข้อมูล
cursor.execute(insert_sql, ('1234', 'testt'))

# Commit การเปลี่ยนแปลง
conn.commit()

print(da)