from fastapi import APIRouter

from src.methods.insert import insert_data_to_db
from src.methods.search import search_all_data, search_data_by_id
from src.methods.update import update_data_to_db
from src.utils.utils import InsertSchema, ResponseModel, UpdateSchema

router = APIRouter(prefix="/companies",tags=["companies"])

@router.get('/getall')
async def get_all_companies() -> ResponseModel:
        
    data = search_all_data(table_name='companies')
    return ResponseModel(status_code=200, msg='Finish', data=data)

@router.get('/search')
async def search_companies(id: int) -> ResponseModel:
    data = search_data_by_id(table_name='companies', id=id)
    return ResponseModel(status_code=200, msg='Finish', data=data)
    
@router.post('/insert')
async def insert_companies(input_map: InsertSchema) -> ResponseModel:
    id = insert_data_to_db(table_name="companies", data=input_map.data)
    return ResponseModel(status_code=200, msg='Finish', data=dict(id=id))
    
@router.post('/update')
async def update_line(input_map: UpdateSchema) -> ResponseModel:
    id = update_data_to_db(table_name="companies", id=input_map.id, data=input_map.data)
    return ResponseModel(status_code=200, msg='Finish', data=dict(id=id))
    