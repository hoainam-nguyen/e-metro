from minio import Minio
from io import BytesIO
from PIL import Image

# Thiết lập thông tin kết nối đến MinIO server
minio_client = Minio(
    endpoint='localhost:9000',
    access_key='minio',
    secret_key='minio123',
    secure=False  # Thay True nếu sử dụng SSL/TLS
)

# Kiểm tra xem bucket có tồn tại chưa, nếu chưa thì tạo mới
bucket_name = 'e-metro'
try:
    if not minio_client.bucket_exists(bucket_name):
        minio_client.make_bucket(bucket_name)
except Exception as err:
    print(f"Lỗi: {err}")


# Đọc ảnh từ PIL.Image
image_path = '/home/mmlab/UIT/e-metro/be/data/image_test.jpg'
image = Image.open(image_path)

# Chuyển đổi ảnh thành dữ liệu nhị phân (bytes)
image_bytes = BytesIO()
image.save(image_bytes, format='JPEG')
image_bytes.seek(0)

# Lưu ảnh vào MinIO
object_name = 'image_test.jpg'

try:
    minio_client.put_object(
        bucket_name,
        object_name,
        image_bytes,
        length=image_bytes.getbuffer().nbytes,
        content_type='image/jpeg'  # Thay đổi theo định dạng ảnh của bạn
    )
    print(f"Ảnh đã được lưu vào MinIO: {object_name}")
except Exception as err:
    print(f"Lỗi: {err}")

if __name__=="__main__":
    pass