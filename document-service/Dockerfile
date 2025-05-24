# Imagen base con soporte completo (no Alpine)
FROM node:18-slim

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema necesarias para pdf-poppler
RUN apt-get update && apt-get install -y \
  poppler-utils \
  && rm -rf /var/lib/apt/lists/*

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Crear carpeta temporal para imágenes si no existe
RUN mkdir -p uploads/tmp

# Exponer el puerto de la app
EXPOSE 3000

# Comando de arranque
CMD ["node", "src/index.js"]
