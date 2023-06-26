import os

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.const import RESOUSCE_MAP
from src.db import load_database
from src.routers import (base, companies, lines, stations, system, tickets,
                         trains, users)

RESOUSCE_MAP['db'] = load_database()

app = FastAPI(docs_url='/')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  
)


app.include_router(system.router)
app.include_router(base.router)
app.include_router(users.router)
app.include_router(trains.router)
app.include_router(companies.router)
app.include_router(stations.router)
app.include_router(lines.router)
app.include_router(tickets.router)

if __name__=="__main__":
    uvicorn.run(
        app=app,
        host='0.0.0.0',
        port=5002
    )


