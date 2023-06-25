from fastapi import APIRouter

router = APIRouter()

@router.get('/ping', tags=["system"])
async def ping():
    return dict(status_code=200, msg='OK')
