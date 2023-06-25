import json
from typing import Dict

from psycopg2 import sql

from src.const import RESOUSCE_MAP
from src.methods.search import search_data_by_id


def update_data_to_db(table_name: str, id: int, data: Dict):
    columns = data.keys()
    values = data.values()
    
    set_clause = []
    for c, v in zip(list(columns), list(values)):
        if isinstance(v, dict):
            _v = json.dumps(v)
        elif isinstance(v, list):
            _v = json.dumps(v)
            _v = "{" + f"{_v[1:-1]}" + "}"
        else:  
            _v = str(v)          
            
        set_clause.append(f"{c} = '{_v}'")

    set_clause = ", ".join(set_clause)
    where_clause = f"id = {id}"
    
    _sql_str = sql.SQL("UPDATE {} SET {} WHERE {} RETURNING id").format(
        sql.Identifier(table_name),
        sql.SQL(set_clause),
        sql.SQL(where_clause)
    )

    conn = RESOUSCE_MAP['db']
    cursor = conn.cursor()
    try:
        cursor.execute(_sql_str)
        _id = cursor.fetchone()[0]
        
        conn.commit()
        cursor.close()
        
    except Exception as e:
        print(f"[ERROR] {e}")
        conn.commit()
        cursor.close()
        
        _id = None
    
    return _id 


def update_via_image(type: str, id: int, image_url: str):
    if type=="users":
        data = search_data_by_id(table_name="users", id=id)[0] 
        # data["info"]["avatar"] = image_url
        data['image_url'] = image_url
        update_data_to_db(table_name="users", id=id, data=data)
        
    if type=="companies":
        data = search_data_by_id(table_name="companies", id=id)[0] 
        data["image_url"] = image_url
        update_data_to_db(table_name="companies", id=id, data=data)
        
    if type=="stations":
        data = search_data_by_id(table_name="stations", id=id)[0] 
        # data["info"]["image_map"] = image_url
        data["image_url"] = image_url
        update_data_to_db(table_name="stations", id=id, data=data)


def delete_user_by_id(id):
    _sql_str = f'''
    DELETE FROM users WHERE 1=1 and id={id}
    '''
    conn = RESOUSCE_MAP['db']
    cursor = conn.cursor()
    
    try:
        cursor.execute(_sql_str)        
        conn.commit()
        cursor.close()
        
    except Exception as e:
        print(f"[ERROR] {e}")
        conn.commit()
        cursor.close()
    

