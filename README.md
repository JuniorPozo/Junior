npm init playwright@latest

Run the install command and select the following to get started:

Choose between TypeScript or JavaScript (default is TypeScript)
Name of your Tests folder (default is tests or e2e if you already have a tests folder in your project)
Add a GitHub Actions workflow to easily run tests on CI
Install Playwright browsers (default is true)

To execute the 5 test scripts created and watch the browser run below command

npm run tests:e2e -- --headed 

To execute the 5 test scripts created without watch the browser run below command

npm run tests:e2e

To execute the 5 test cases and generate a report, it can be executed below comand, config option use the connfig file configured and project option use the browser selected

npx playwright test --config=playwright.config.ts --project=Chromium --reporter=htmlclear