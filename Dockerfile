FROM node:14-alpine
WORKDIR /app
ENV PORT=5500
COPY . .
RUN npm install
CMD [ "npm", "start" ]