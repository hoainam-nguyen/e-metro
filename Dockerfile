FROM python:3.9-slim

RUN apt-get update

COPY backend/requirements.txt .
RUN pip install --upgrade wheel setuptools pip
RUN pip install -r requirements.txt
 
WORKDIR /app
CMD ["python", "app.py"]
