# Use a Node.js Docker image with a specific version
FROM node:18.13-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli@17.0.7

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set the environment variable for the port
ENV PORT=4200

EXPOSE 4200

# Set the command to run when the container starts
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]

