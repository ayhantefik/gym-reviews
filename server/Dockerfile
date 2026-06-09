FROM 612555043829.dkr.ecr.us-east-1.amazonaws.com/nginx:alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]