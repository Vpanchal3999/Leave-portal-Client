FROM node:18.17.1 as build

# Set the working directory for Angular build
WORKDIR /app/processes-client

# Copy the Angular app package.json and install dependencies
COPY ./ ./
RUN npm install --force --fetch-timeout=120000

# Copy the Angular app source code and build it
RUN npm run build

WORKDIR /app
# # Stage 2: Setting up Nginx to serve the Angular app
FROM nginx:alpine

# Copy the build output to the Nginx serve directory
COPY --from=build /app/processes-client/dist/leave-portal-v2 /usr/share/nginx/html

EXPOSE 80

COPY ./startup.sh /startup.sh
RUN chmod +x /startup.sh
CMD ["/startup.sh"]
