import time 
from fastapi import APIRouter
from src.methods.upload_image import upload_image_handler
from src.utils.utils import UploadImage, ResponseModel

from src.methods.update import update_via_image

router = APIRouter(tags=["base"])

@router.post('/upload-image')
async def upload_image(input_map: UploadImage) -> ResponseModel:

    image_name = f"{input_map.type}_{input_map.id}_{eval(str(time.time()))}.jpg"
    image_url = upload_image_handler(input_map.image_base64, image_name)
    # Update database
    try:
        update_via_image(type=input_map.type, id=input_map.id, image_url=image_url)    
    except Exception as err:
        print(err)

    return ResponseModel(status_code=200, msg="Finish!", data=dict(image_url=image_url, type=input_map.type, id=input_map.id))