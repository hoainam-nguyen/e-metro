import os 
import uvicorn

from fastapi import FastAPI

from src.db import load_database
from src.const import RESOUSCE_MAP
from src.routers import system, users, companies, lines, stations, trains

RESOUSCE_MAP['db'] = load_database()

app = FastAPI(docs_url='/')

app.include_router(system.router)
app.include_router(users.router)
app.include_router(trains.router)
app.include_router(companies.router)
app.include_router(stations.router)
app.include_router(lines.router)


def main():
    pass 

if __name__=="__main__":
    uvicorn.run(
        app=app,
        host='0.0.0.0',
        port=5002
    )
