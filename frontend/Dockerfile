# Use Node.js official image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose frontend port
EXPOSE 3000

# Start the frontend server using Vite
CMD ["npm", "run", "start"]
