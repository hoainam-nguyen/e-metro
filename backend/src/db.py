import psycopg2

def load_database():
    # Establish the connection
    conn = psycopg2.connect(
        host="localhost",
        port="5432",
        database="postgres",
        user="admin",
        password="admin"
    )
    return conn
