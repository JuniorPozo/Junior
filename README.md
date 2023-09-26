npm init playwright@latest

Run the install command and select the following to get started:

Choose between TypeScript or JavaScript (default is TypeScript)
Name of your Tests folder (default is tests or e2e if you already have a tests folder in your project)
Add a GitHub Actions workflow to easily run tests on CI
Install Playwright browsers (default is true)

To execute the 3 test scripts created and watch the browser run below command

npm run tests:e2e -- --headed 

To execute the 3 test scripts created without watch the browser run below command

npm run tests:e2e
