FROM nginx:alpine

COPY dist /usr/share/nginx/html

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]