# Use an official Node.js runtime as a parent image
FROM node:14-alpine as build

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in package.json
RUN npm config set registry https://registry.npmjs.org/
RUN npm install -g npm@latest && npm cache clean --force && npm install

# Build the React app
RUN npm run build

# Use NGINX as the production server
FROM nginx:latest

# Copy the built app from the build stage to the NGINX public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to serve the app
EXPOSE 80

# Start NGINX when the container launches
CMD ["nginx", "-g", "daemon off;"]

