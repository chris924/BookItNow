# Use a Node.js image with a specific version
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Build the Vite project
RUN npm run build

# Expose the port that the application will run on
EXPOSE 5173

# Install serve node package
RUN npm install -g serve

# Set the default command to run the application using serve
CMD ["serve", "-s", "build", "-l", "3000"]