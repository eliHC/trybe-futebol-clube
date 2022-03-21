FROM node:16-alpine AS frontend

WORKDIR /frontend

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
