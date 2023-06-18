# docker run -p 9000:9000 --name minio1 -e "MINIO_ACCESS_KEY=minio" -e "MINIO_SECRET_KEY=minio123" -v data:/data minio/minio server /data

# docker run -p 9000:9000 --name minio1 -e "MINIO_ACCESS_KEY=minio" -e "MINIO_SECRET_KEY=minio123" -v /mnt/data:/data minio/minio server /data --console-address ":9001"

docker run -p 9000:9000 -p 9001:9001 --name minio1 -e "MINIO_ROOT_USER=minio" -e "MINIO_ROOT_PASSWORD=minio123" -v /mnt/data:/data minio/minio server /data --console-address ":9001"
