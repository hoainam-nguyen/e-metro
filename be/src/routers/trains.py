from fastapi import APIRouter

from src.utils.utils import (UpdateSchema, InsertSchema, ResponseModel)
from src.methods.search import search_data_by_id
from src.methods.insert import insert_data_to_db
from src.methods.update import update_data_to_db

router = APIRouter(prefix="/trains",tags=["trains"])

@router.get('/search')
async def search_train(id: int) -> ResponseModel:
        
    data = search_data_by_id(table_name='trains', id=id)
    return ResponseModel(status_code=200, msg='Finish', data=data)

@router.post('/insert')
async def insert_train(input_map: InsertSchema) -> ResponseModel:
    
    id = insert_data_to_db(table_name="trains", data=input_map.data)
    return ResponseModel(status_code=200, msg='Finish', data=dict(id=id))
    
    
@router.post('/update')
async def update_line(input_map: UpdateSchema) -> ResponseModel:
    id = update_data_to_db(table_name="trains", id=input_map.id, data=input_map.data)
    return ResponseModel(status_code=200, msg='Finish', data=dict(id=id))
    