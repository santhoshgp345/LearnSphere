# Use Node.js official image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including dev)
RUN npm install

# Copy all source files
COPY . .

# Expose backend port
EXPOSE 8000

# Start the backend server with nodemon
CMD ["npm", "run", "dev"]
