from fastapi import APIRouter

from src.utils.utils import (SearchSchema, UpdateSchema, InsertSchema, ResponseModel)
from src.methods.search import search_data_by_id, search_all_data
from src.methods.insert import insert_data_to_db
from src.methods.update import update_data_to_db

router = APIRouter(prefix="/users",tags=["users"])

@router.get('/getall')
async def get_all_users() -> ResponseModel:
        
    data = search_all_data(table_name='users')
    return ResponseModel(status_code=200, msg='Finish', data=data)

@router.get('/search')
async def search_user(id: int) -> ResponseModel:
        
    data = search_data_by_id(table_name='users', id=id)
    return ResponseModel(status_code=200, msg='Finish', data=data)

@router.post('/insert')
async def insert_user(input_map: InsertSchema) -> ResponseModel:
    
    id = insert_data_to_db(table_name="users", data=input_map.data)
    return ResponseModel(status_code=200, msg='Finish', data=dict(id=id))

@router.get('/verify')
async def verify_user(id, user_name, password) -> ResponseModel:
    status = False
    try:
        data = search_data_by_id(table_name='users', id=id)[0]
        if (data["user_name"] == user_name) and (str(data["password"]) == str(password)):
            status = True
    except:
        pass 

    return ResponseModel(status_code=200, msg='Finish', data=dict(verified=status))
    
@router.post('/update')
async def update_user(input_map: UpdateSchema) -> ResponseModel:
    id = update_data_to_db(table_name="users", id=input_map.id, data=input_map.data)
    return ResponseModel(status_code=200, msg='Finish', data=dict(id=id))
    
