FROM node:14.19-alpine as builder
WORKDIR /opt/app/
COPY package*.json ./

COPY . .
RUN npm install
RUN npm install webpack
RUN npm install -g typescript
RUN npm run build && npm prune --production

FROM  ubuntu:18.04 as server
USER root
RUN apt-get update -y

#install node, npm
ENV NODE_VERSION=16.13.0
RUN apt-get -y install curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

#insall python
RUN apt install software-properties-common -y
RUN add-apt-repository ppa:deadsnakes/ppa -y
RUN apt update -y
RUN apt install python3 -y

#install pip3
RUN apt-get -y install python3-pip -y

#install yt-dlp
RUN pip3 install yt-dlp

WORKDIR /opt/app/
COPY --from=builder /opt/app/dist ./dist
COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app/package.json ./package.json
CMD ["node", "dist/app.js"]