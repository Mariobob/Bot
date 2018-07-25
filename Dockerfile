FROM node:8

LABEL name "RemBot: Discord Bot"
LABEL version "0.2.0"
LABEL maintainer "August (Chris) <august@augu.me>"

COPY package*.json .

RUN npm install -g pm2 yarn

# If there done:
RUN yarn install
# /\ Installs Depedendencies faster.

COPY . .

CMD ["pm2", "start", "Rem.js", "--name=\"Rem\""]