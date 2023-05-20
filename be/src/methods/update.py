import json
from typing import Dict

from psycopg2 import sql

from src.const import RESOUSCE_MAP

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