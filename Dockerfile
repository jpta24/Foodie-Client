# Stage 1: Build stage using Node.js
FROM node:14 as build-stage

# Set the working directory inside the container to /foodie-client
WORKDIR /foodie-client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of the frontend source code to the working directory
COPY . .

# Set an argument for the React app's API base URL
ARG REACT_APP_API_BASE_URL

# Set the environment variable for the React app's API base URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# Build the production-optimized version of the React app
RUN npm run build

# Stage 2: Final stage using Nginx
FROM nginx:1.17.0-alpine

# Copy the production build from the previous stage to the Nginx document root
COPY --from=build-stage /foodie-client/build /usr/share/nginx/html

# Expose the port specified by the $REACT_DOCKER_PORT environment variable
EXPOSE $REACT_DOCKER_PORT

# Start Nginx in the foreground with the specified configuration
CMD nginx -g 'daemon off;'
