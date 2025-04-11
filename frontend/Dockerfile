FROM node:20-alpine

WORKDIR /app
COPY /app/node_modules ./node_modules

RUN npm install
CMD ["npm", "run", "dev"]