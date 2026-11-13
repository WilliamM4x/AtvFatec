FROM node:20


WORKDIR /app/front

COPY package*.json ./


RUN npm cache clean --force && npm install --legacy-peer-deps


COPY . /app/front

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]