FROM mcr.microsoft.com/playwright:v1.62.0-noble

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV CI=true
ENV HEADLESS=true
ENV BROWSER=chromium
ENV TAG=Smoke

CMD ["sh", "-c", "npm run clean && npm run generate-feature && npx ts-node src/scripts/RetryRunner.ts; TEST_EXIT=$?; echo '========================================'; echo 'EXPORTING ALLURE RESULTS'; echo '========================================'; mkdir -p /docker-output; if [ -d /app/allure-results ]; then cp -a /app/allure-results/. /docker-output/; echo 'Allure results exported successfully'; else echo 'WARNING: /app/allure-results does not exist'; fi; exit $TEST_EXIT"]