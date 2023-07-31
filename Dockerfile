# Utiliza la imagen oficial de Node.js como base
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el contenido de la carpeta 'dist/front' en el contenedor
COPY dist/front/ .

# Instala http-server globalmente para servir la aplicación Angular
RUN npm install -g http-server

# Expone el puerto 8080 para acceder a la aplicación
EXPOSE 8080

# Comando para iniciar el servidor http-server y mantenerlo en ejecución
CMD ["http-server", "-c-1"]
