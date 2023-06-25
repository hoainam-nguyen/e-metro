import os
import smtplib
import ssl
import time
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from threading import Thread

from dotenv import find_dotenv, load_dotenv

_ = load_dotenv(find_dotenv())


class EmailThread(Thread):
    def __init__(self, contact):
        self.user_name = os.environ["ADMIN_EMAIL"]
        self.password = os.environ["ADMIN_PASSWORD"]
        
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
