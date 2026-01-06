# Use Node.js version 18
FROM node:18-alpine

# Create a folder inside the container
WORKDIR /app

# Copy package.json and install the libraries
COPY package.json .
RUN npm install

# Copy the rest of the React code
COPY . .

# Open port 3000 (where React runs)
EXPOSE 3000

# Start React
CMD ["npm", "start"]