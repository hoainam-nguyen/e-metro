import json
from typing import Dict

from psycopg2 import sql

from src.const import RESOUSCE_MAP


def insert_data_to_db(table_name: str, data: Dict):
    columns = data.keys()
    values = data.values()
        
    _sql_str = sql.SQL("INSERT INTO {} ({}) VALUES ({}) RETURNING id").format(
        sql.Identifier(table_name),
        sql.SQL(', ').join(map(sql.Identifier, columns)),
        sql.SQL(', ').join(sql.Placeholder() * len(values))
    )
    
    _values_str = []
    for v in list(values):
        if isinstance(v, dict):
            _v = json.dumps(v)
            _values_str.append(_v)
        elif isinstance(v, list):
            _v = json.dumps(v)
            _v = "{" + f"{_v[1:-1]}" + "}"
            _values_str.append(_v)

        else:            
            _values_str.append(str(v))
    conn = RESOUSCE_MAP['db']
    cursor = conn.cursor()
    try:
        cursor.execute(_sql_str, _values_str)
        _id = cursor.fetchone()[0]
        
        conn.commit()
        cursor.close()
        
    except Exception as e:
        print(f"[ERROR] {e}")
        conn.commit()
        cursor.close()
        
        _id = None
    
    return _id 