FROM node:14-alpine
WORKDIR /app
ENV PORT 5500
ENV DB "social_media"
EXPOSE 5500
COPY . .
RUN echo "PORT: ${PORT}"
RUN npm install
CMD [ "npm", "start" ]