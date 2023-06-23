import random

from fastapi import APIRouter

from src.methods.insert import insert_data_to_db
from src.methods.search import (search_all_data, search_data_by_id,
                                search_passwd_by_useremail)
from src.methods.send_mail import EmailThread
from src.methods.update import update_data_to_db
from src.utils.utils import (InsertSchema, ResponseModel, SearchSchema,
                             UpdateSchema)

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
async def verify_user(user_email, user_password) -> ResponseModel:
    status = False
    user_id = None
    try:
        data = search_passwd_by_useremail(user_email)[0]
        print(data)
        if str(data["user_password"]) == str(user_password):
            status = True
            user_id = data["id"]
    except Exception as err:
        print(err)

    return ResponseModel(status_code=200, msg='Finish', data=dict(verified=status, user_id=user_id))
    
@router.post('/update')
async def update_user(input_map: UpdateSchema) -> ResponseModel:
    id = update_data_to_db(table_name="users", id=input_map.id, data=input_map.data)
    return ResponseModel(status_code=200, msg='Finish', data=dict(id=id))
    

@router.get('/reset')
async def reset_passwd(user_email: str) -> ResponseModel:
    password_new = [str(random.randint(0,9)) for _ in range(6)]
    password_new = ''.join(password_new)

    try:
        contact = {"user_email": user_email, "user_password": password_new}
        thread1 = EmailThread(contact)
        thread1.start()

        user_id = search_passwd_by_useremail(user_email)[0]["id"]
        id = update_data_to_db(table_name="users", id=user_id, data={"user_password": password_new})

    except Exception as err:
        print(err)
        return ResponseModel(status_code=200, msg='Error', data={})

    return ResponseModel(status_code=200, msg='Finish', data=contact)