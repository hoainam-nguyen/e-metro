from fastapi import APIRouter

from src.utils.utils import (SearchSchema, UpdateSchema, InsertSchema, ResponseModel)
from src.methods.search import search_data_by_id
from src.methods.insert import insert_data_to_db

router = APIRouter(prefix="/users",tags=["users"])

@router.get('/search')
async def search_user(id: int) -> ResponseModel:
        
    data = search_data_by_id(table_name='users', id=id)
    return ResponseModel(status_code=200, msg='Finish', data=data)

@router.post('/insert')
async def insert_user(input_map: InsertSchema) -> ResponseModel:
    
    id = insert_data_to_db(table_name="users", data=input_map.data)
    return ResponseModel(status_code=200, msg='Finish', data=dict(id=id))
    
    
@router.post('/update')
async def update_user():
    pass 