FROM node:14-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE $PORT
CMD [ "npm", "start" ]