FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .

# Start the server in the Dockerfile
CMD ["npm", "start"]
