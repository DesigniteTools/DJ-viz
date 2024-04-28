FROM node:alpine
WORKDIR /usr/src/app
RUN mkdir smells
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD node index.js