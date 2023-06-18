import random 
import datetime

from fastapi import APIRouter

from src.utils.utils import (SearchSchema, UpdateSchema, InsertSchema, ResponseModel, BuyTicket)
from src.methods.search import search_data_by_id, search_all_data
from src.methods.insert import insert_data_to_db
from src.methods.update import update_data_to_db

router = APIRouter(prefix="/tickets",tags=["tickets"])

@router.get('/getall')
async def get_all_station() -> ResponseModel:
        
    data = search_all_data(table_name='tickets')
    return ResponseModel(status_code=200, msg='Finish', data=data)

@router.get('/search')
async def search_user(id: int) -> ResponseModel:
        
    data = search_data_by_id(table_name='tickets', id=id)
    return ResponseModel(status_code=200, msg='Finish', data=data)

@router.post('/insert')
async def insert_user(input_map: InsertSchema) -> ResponseModel:
    
    id = insert_data_to_db(table_name="tickets", data=input_map.data)
    return ResponseModel(status_code=200, msg='Finish', data=dict(id=id))
    
    
@router.post('/update')
async def update_user(input_map: UpdateSchema) -> ResponseModel:
    id = update_data_to_db(table_name="tickets", id=input_map.id, data=input_map.data)
    return ResponseModel(status_code=200, msg='Finish', data=dict(id=id))


@router.get('/selled')
async def selled_ticker():
    data = search_all_data(table_name='tickets')
    data = [d for d in data if d['is_effective']]
    return ResponseModel(status_code=200, msg='Finish', data=data)
  

@router.post('/buy')
async def buy_tickets(input_map: BuyTicket) -> ResponseModel:
    num = input_map.num
    if num > 10:
        num = 10

    ticket_ids = []

    # NOTE: Dummpy
    price = (input_map.type + input_map.line_id) * 100000
    current_datetime = datetime.datetime.now()

    # Chuyển đổi ngày và giờ thành chuỗi định dạng SQL
    formatted_datetime = current_datetime.strftime('%Y-%m-%d %H:%M:%S')

    for i in range(num):
        data = {
            "type": input_map.type,
            "price": price,
            "line_id": input_map.line_id,
            "is_effective": True,
            "purchase_date": current_datetime,
            "no_used": 1
        }

        ticket_id = insert_data_to_db(table_name="tickets", data=data)
        ticket_ids.append(ticket_id)

    return ResponseModel(status_code=200, msg="Finish", data=dict(ticket_ids=ticket_ids, total_cost=num*price))