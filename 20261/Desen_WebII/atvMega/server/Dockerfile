FROM node:20

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . /app/server

EXPOSE 3001

CMD ["npm", "run", "dev"]