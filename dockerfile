FROM node:20-bookworm

RUN npx -y playwright@1.45.1 install --with-deps

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5001

EXPOSE 5001

CMD [ "npm", "start" ]