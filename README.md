# Variables de entorno a configurar

En el archivo **.env**:

NODE_ENV=(development,production)
```
NODE_ENV=

FASTIFY_PORT = 

MYSQL_PORT=
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
```

# Ejecutar Contenedor de Rabbitmq docker

```
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management
```