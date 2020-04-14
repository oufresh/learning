FROM node:lts-buster-slim

# Create app directory
#WORKDIR /home/seauser
#USER seauser
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY yarn.lock .

# RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production
# RUN yarn install --production

COPY dist .
#COPY node_modules /home/seauser/node_modules
COPY node_modules /usr/src/app/node_modules

#service port
EXPOSE 3001

#Start service
CMD [ "node", "server.js" ]