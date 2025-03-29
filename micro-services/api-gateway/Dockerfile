FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install tsx typescript @types/node
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npx", "tsx", "src/app.ts"]