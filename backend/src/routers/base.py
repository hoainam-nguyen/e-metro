import time

import random
from fastapi import APIRouter

from src.methods.update import update_via_image
from src.methods.upload_image import upload_image_handler
from src.methods.search import search_all_data, search_revenue_by_company_id
from src.utils.utils import ResponseModel, UploadImage

router = APIRouter(tags=["base"])

@router.post('/upload-image')
async def upload_image(input_map: UploadImage) -> ResponseModel:

    image_name = f"{input_map.type}_{input_map.id}_{eval(str(time.time()))}.jpg"
    image_url = upload_image_handler(input_map.image_base64, image_name)
    try:
        update_via_image(type=input_map.type, id=input_map.id, image_url=image_url)    
    except Exception as err:
        print(err)
        ResponseModel(status_code=200, msg="Error", data={})
    
    return ResponseModel(status_code=200, msg="Finish!", data=dict(image_url=image_url, type=input_map.type, id=input_map.id))

@router.get('/revenue')
async def company_revenue(company_id: int, year: int):
    json_data = search_revenue_by_company_id(company_id)
    data = [0 for i in range(12)]

    for jd in json_data:
        try:
            month = int(jd["purchase_date"].split("/")[1])
            month = month - 1
            data[month] += int(jd["price"])
        except Exception as err:
            print(err)

    # data = [random.randint(1000000, 10000000) for _ in range(12)]
    return ResponseModel(status_code=200, msg="Finish!", data=data)

@router.get('/revenue_all')
async def company_revenue():
    json_data = search_all_data("tickets")
    # data = [random.randint(1000000, 10000000) for _ in range(12)]
    data = [0 for i in range(12)]

    for jd in json_data:
        try:
            month = int(jd["purchase_date"].split("/")[1])
            month = month - 1
            data[month] += int(jd["price"])
        except Exception as err:
            print(err)

    return ResponseModel(status_code=200, msg="Finish!", data=data)