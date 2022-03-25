FROM node:16-alpine AS backend

WORKDIR /backend

COPY . .

RUN npm install

EXPOSE 3001

CMD [ "npm", "start"]
