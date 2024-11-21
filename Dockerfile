
FROM node:20.16.0
WORKDIR /app
COPY package*.json ./
#RUN npm install -g nodemon
RUN npm install
COPY . . 
EXPOSE 4000
CMD [ "node", "index.js" ]
