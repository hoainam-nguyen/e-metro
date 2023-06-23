import smtplib, ssl
import pandas as pd
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from threading import Thread
import time


class EmailThread(Thread):
    def __init__(self, contact):
        self.user_name = "20520075@gm.uit.edu.vn"
        self.password = "1314955038"
        self.title = "[E-Metro System] Reset Password"
        self.template = open('src/utils/template_send_mail.html').read()
        self.count = 0
        self.contact = contact
        Thread.__init__(self)


    def run(self):
        context = ssl.create_default_context()
        time.sleep(1)
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(self.user_name, self.password)


            message = MIMEMultipart("alternative")
            message["Subject"] = self.title
            message["From"] = "Hoai Nam Nguyen"

            html = self.template.format(**self.contact)
            message.attach(MIMEText(html, "html"))


            server.sendmail(
                self.user_name,
                self.contact["user_email"],
                message.as_string(),)

            print(f'[INFO] DONE! Sent mail to {self.contact["user_email"]}')
            print("-"*15)


# if __name__ == "__main__":

#     username = "20520075@gm.uit.edu.vn"
#     password = "1314955038"

#     title = "[E-Metro System] Reset Password"

#     # change here

#     template = open('src/utils/template_send_mail.html').read()

#     contact = {"user_email": "hoainam1001.nhn@gmail.com", "user_password": "123456"}
#     thread1 = EmailThread(username, password, title, contact, template)
#     thread1.start()