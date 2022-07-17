FROM nikolaik/python-nodejs:python3.10-nodejs18

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build
CMD ["node", "dist/app.js"]
