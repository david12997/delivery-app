# Use a Node.js base image with a specific version as the base image
FROM node:18-alpine

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev nano

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json para instalar dependencias
COPY ./package.json ./package-lock.json ./

# Instala las dependencias de tu aplicación
RUN npm install --legacy-peer-deps

# Reconstruye las dependencias para la plataforma de Docker
RUN npm rebuild

# Copia todo el contenido de tu proyecto al directorio de trabajo en el contenedor
COPY . .

# Construye la aplicación Next.js en modo de producción
RUN npm run build

# Expone el puerto 3000 para la aplicación Next.js
EXPOSE 3000

# Expone el puerto 3001 para el servidor de WebSockets (Socket.io)
EXPOSE 3001

# Copia el script de inicio al contenedor
COPY ./start.sh /app/start.sh

# Da permisos de ejecución al script de inicio
RUN chmod +x /app/start.sh

# Comando para ejecutar el script de inicio que maneja ambos comandos en paralelo
CMD ["/app/start.sh"]

#docker run -d -p 3000:3000 -p 3001:3001  --restart=always david12997/doomis:latest