# Deploy Heroku Host Server 🚀

_In this part of our project we need to deploy our project on the host server and the best option is Heroku, because we can connect our GitHub repository automatically with Github Actions._

## Getting Started 📋

_To get started using the action, just make sure to have a Procfile in your project:_

_./Procfile_

```
web: node index.js
```

_And then create a folder called .github and inside it create another folder called workflows. Finally inside the workflows folder, create a file called main.yml with the following contents:_

```
name: Deploy

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: akhileshns/heroku-deploy@v3.12.12 # This is the action
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: ${{ secrets.HEROKU_APP_NAME }}
          heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

_Now let's go to our Heroku account and go to Account Settings. Scroll to the bottom until you see the API key. Copy this key and go to your project's repository on GitHub._

_In your Repo, go to Settings -> Secrets and click on "New Secret". Then enter_ HEROKU*API_KEY \_as the name and paste the copied API Key as the value. You do the same with* HEROKU_APP_NAME and HEROKU_GMAIL.

_The next step is to open the Heroku application and click on Deploy, once there click on the deployment method and select GitHub, and then just follow the steps._

_You can now push your project to GitHub and it will be automatically deployed to Heroku henceforth._

## Time to use ⚙️

_Whenever you push your project to master heroku updated your Heroku application automatly, you can see the changes in:_

```
https://NAME-OF-PROJECT.herokuapp.com/
```
