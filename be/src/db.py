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

# # Create a cursor
# cursor = conn.cursor()

# # Execute a query
# cursor.execute("SELECT * FROM company")

# # Fetch all the results
# results = cursor.fetchall()

# # Do something with the results
# for row in results:
#     print(row)

# # Close the cursor and connection
# cursor.close()
# conn.close()
