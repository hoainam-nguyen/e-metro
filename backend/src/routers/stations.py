from fastapi import APIRouter

from src.methods.insert import insert_data_to_db
from src.methods.search import search_all_data, search_data_by_id
from src.methods.update import update_data_to_db
from src.utils.utils import (InsertSchema, ResponseModel, SearchSchema,
                             UpdateSchema)

router = APIRouter(prefix="/stations",tags=["stations"])

@router.get('/getall')
async def get_all_station() -> ResponseModel:
        
    data = search_all_data(table_name='stations')
    return ResponseModel(status_code=200, msg='Finish', data=data)

@router.get('/search')
async def search_station(id: int) -> ResponseModel:
        
    data = search_data_by_id(table_name='stations', id=id)
    return ResponseModel(status_code=200, msg='Finish', data=data)

@router.post('/insert')
async def insert_station(input_map: InsertSchema) -> ResponseModel:
    
    id = insert_data_to_db(table_name="stations", data=input_map.data)
    return ResponseModel(status_code=200, msg='Finish', data=dict(id=id))
    
@router.post('/update')
async def update_station(input_map: UpdateSchema) -> ResponseModel:
    id = update_data_to_db(table_name="stations", id=input_map.id, data=input_map.data)
    return ResponseModel(status_code=200, msg='Finish', data=dict(id=id))
    
