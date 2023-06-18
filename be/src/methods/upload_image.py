import os
import uuid 
import base64
from io import BytesIO
from minio import Minio
from PIL import Image

# Cấu hình thông tin kết nối MinIO
minio_client = Minio(
    endpoint='localhost:9000',
    access_key='minio',
    secret_key='minio123',
    secure=False  # Thay True nếu sử dụng SSL/TLS
)

# Kiểm tra xem bucket có tồn tại chưa, nếu chưa thì tạo mới
minio_bucket = 'e-metro'

def upload_image_to_minio(image_pil, object_name):
    try:
        
        # Chuyển đổi ảnh thành dữ liệu nhị phân (bytes)
        image_bytes = BytesIO()
        image_pil.save(image_bytes, format='JPEG')
        image_bytes.seek(0)

        # Lưu ảnh vào MinIO
        minio_client.put_object(
            minio_bucket,
            object_name,
            image_bytes,
            length=image_bytes.getbuffer().nbytes,
            content_type='image/jpeg'  # Thay đổi theo định dạng ảnh của bạn
        )

        
        # Tạo URL truy cập cho hình ảnh đã lưu
        image_url = f"https://aiclub.uit.edu.vn/namnh/minio/{minio_bucket}/{object_name}"
        
        return image_url
    except Exception as err:
        print("Lỗi khi lưu hình ảnh vào MinIO:", err)
        return None

# Handler cho endpoint upload image
def upload_image_handler(image_base64, image_name):
    try:
        image_data = base64.b64decode(image_base64)
        image_pil = Image.open(BytesIO(image_data))

        image_url = upload_image_to_minio(image_pil=image_pil, object_name=image_name)
        return image_url
    except Exception as err:
        return {"error": err}
    
