
from pydantic import BaseModel
from typing import Any, Dict

class SearchSchema(BaseModel):
    id: int 
    
class UpdateSchema(BaseModel):
    id: int
    data: Dict[str, Any]

class InsertSchema(BaseModel):
    data: Dict[str, Any]

class ResponseModel(BaseModel):
    status_code: int 
    msg: str
    data: Any     