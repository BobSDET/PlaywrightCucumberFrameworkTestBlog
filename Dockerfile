FROM mcr.microsoft.com/playwright:v1.62.0-noble

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV CI=true
ENV HEADLESS=true
ENV BROWSER=chromium
ENV TAG=Smoke

CMD ["sh", "-c", "npm run clean && npm run generate-feature; TEST_EXIT=$?; if [ -d /app/allure-results ]; then mkdir -p /docker-output && cp -a /app/allure-results/. /docker-output/; fi; exit $TEST_EXIT"]