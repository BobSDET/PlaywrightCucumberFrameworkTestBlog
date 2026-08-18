FROM mcr.microsoft.com/playwright:v1.62.0-noble

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV CI=true
ENV HEADLESS=true
ENV BROWSER=chromium
ENV TAG=Smoke

CMD ["npx", "ts-node", "src/scripts/RetryRunner.ts"]