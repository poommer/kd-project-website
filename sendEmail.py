import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# กำหนดข้อมูลเซิร์ฟเวอร์ SMTP และข้อมูลเข้าสู่ระบบ
smtp_server = 'mail.poommer.in.th'
port = 587
sender_email = 'poommeri@poommer.in.th'
password = '5.8Q8tTf3iME.c'

# กำหนดข้อมูลผู้รับ
receiver_email = 'poommer.notused@gmail.com'

# สร้างข้อความอีเมล
msg = MIMEMultipart()
msg['From'] = sender_email
msg['To'] = receiver_email
msg['Subject'] = 'Test Email from Python'

body = 'This is a test email sent from Python.'
msg.attach(MIMEText(body, 'plain'))

# เชื่อมต่อกับเซิร์ฟเวอร์ SMTP
# try:
server = smtplib.SMTP(smtp_server, port)
server.starttls()
server.login(sender_email, password)
text = msg.as_string()
server.sendmail(sender_email, receiver_email, text)
print('Email sent successfully')
# except Exception as e:
#     print('Error:', e)
# finally:
#     server.quit()
