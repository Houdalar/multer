FROM node:16-alpine

WORKDIR /usr/app

#install app dependencies

COPY package*.json .

RUN npm i

# Bundle app source
COPY . .

EXPOSE 9090

CMD [ "npm", "start" ]
#CMD [ "npm", "run","dev" ]

# to buid our docker image : docker build -t node-app . (node-app is the name of the image)
# to run our docker image : docker run -p 9090:9090 node-app