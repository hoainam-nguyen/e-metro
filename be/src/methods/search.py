from src.const import RESOUSCE_MAP
from typing import List


def search_all_data(table_name: str):
    
    _sql_str = f'''
    SELECT * FROM {table_name} WHERE 1=1
    '''
    
    conn = RESOUSCE_MAP['db']
    cursor = conn.cursor()
    cursor.execute(_sql_str)
    
    
    results = cursor.fetchall()
    column_names = [desc.name for desc in cursor.description]
    
    results_dict = []
    for result in results:
        results_dict.append(
            dict(zip(column_names, result))
        )
        
    return results_dict
    
def search_data_by_id(table_name: str, id: int) -> List:
    
    _sql_str = f'''
        SELECT * FROM {table_name} WHERE 1=1 and id={id} 
        '''
        
    conn = RESOUSCE_MAP['db']
    cursor = conn.cursor()
    cursor.execute(_sql_str)
    
    column_names = [desc.name for desc in cursor.description]
    result = cursor.fetchone()
    
    conn.commit()
    cursor.close()
    
    result_dict = dict(zip(column_names, result))
    return [result_dict]