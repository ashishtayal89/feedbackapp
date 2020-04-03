# Objective

To create a web application which will collect feedback for a product. This application can be marketed to different companies with diverse products for which they can be charged.

# Repo

> https://github.com/StephenGrider/FullstackReactCode

# Help

1. **Udemy Discussion Threads**
   Chances are others are having the same troubleshooting issue as you!

2. **PM Stephen on Udemy**
   Usually fastest reply

3. **Twitter**
   https://twitter.com/ste_grider

4. **Google**
   There may be a solution for your issue already answered on Github or StackOverflow

# Imp Commands

1. `cat package.json` : To open package.json

# Diagram

1. `01 > 001` : Application Use Case(Who and why will use the application).
2. `01 > 002` : Application flow(How user will use the application).Here the **user** is our client or the companies which will use our feedback management app. The **surveyes** are the end users of the product created by our client.

   > **NOTE**: **Users** are the users of the application. **Surveyes** are the end user or the customers of our app users.

3. `01 > 003` : Tech stack used at different levels in the app.
4. `02 > 000` : Explains the flow of request from node to express.
5. `02 > 001` : Type of request methods supported by express. ie get,post,put,delete,patch
6. `02 > 017` : Heroku deployment checklists
7. `02 > 016` : Heroku deployment

# App Tech

## Google OAuth(Express + MongoDB + PassportJS)

### Architecture()

## Payment Gateway(Stripe + MongoDB)

## Campaign Creation(React + Redux)

## Email Survey(Email Provider)

## Tabulation and Report creation from survey(Email Provider + Express + Mongo + React + Redux)

# Take Aways

## Heroku

### Checklist(02 > 017)

1. **PORT** : Heroku defines the port at which our application will be able to listen to the incoming request. To enable our application to be able to listen to that port we use `const PORT = process.env.PORT`. Heroku sets the PORT to our environment variable.

2. **Engines to use** :

   ```javascript
    "engines": {
        "node": "12.16.1",
        "npm": "6.13.4"
    },
   ```

3. **Start script** : `"start": "node index.js",`

4. **Remove intalled dependecies** : Add `node_modules` in .gitignore

### Deployment(02 > 016)

#### First Time

1. `heroku -v`
2. `heroku login`
3. `heroku create` : Too create heroku app in heroku. It creates a repository like in our case it is **https://git.heroku.com/calm-meadow-57498.git**. It also assign a domain name and a bunch of other things.
4. `git remote add heroku https://git.heroku.com/calm-meadow-57498.git` : This will add the newly create repo to our local with the name **heroku**.
5. `git push heroku master` : to push the master branch code onto remote with the name heroku ie https://git.heroku.com/calm-meadow-57498.git. This will show you some debug information for heroku deployment.s
6. `heroku open` : To open the app.

#### Second Time Onwards

You just need to do the 5th and 6th step. I you face any issue during the deployment you can use `heroku logs` to see the logs of the heroku deployment.

## NODE

1. **Express App** : `express()` creates a express app. This app remains common throught the application.

   ```javascript
   const express = require("express");
   const app = express();

   app.get("/", (req, res) => {
     res.send({ hi: "there" });
   });

   const PORT = process.env.PORT || 5000;
   app.listen(PORT);
   ```

2. **Passport** :

## REACT

## REDUX

## MONGO

```

```
