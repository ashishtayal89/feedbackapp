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

### Architecture and Flow(02 > 003)

Refer diagram `02 > 003`

### Security Risk

- Hackers can use this flow to get some user infromation which the user is not willing to share. One of the case is discussed below.
- **Case**

  1. A hacker send you a clickable image on your email saying `AirBnB offers.
  2. Once you click this image it takes you to ``https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=airbnb.apps.googleusercontent.com`. Notice here redirect_uri is `http://localhost:5000/auth/google/callback` and clint_Id is `airbnb.apps.googleusercontent.com`. Since client_Id is public so anyone can send anyones clientId.
  3. Not the user gets redirected to google oauth login page showing this is request from airbnb, whereas its redirect url is forget my hacker to his own website.
  4. This way the user unknowing shares his profile info with the hacker.

- To prevent this google first maps the redirect url with the list of url provided by airbnb in its account.

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
   1. For this we install 2 libraries passport and passport strategy. `passport` is the generic oauth handling library for express app. We also install a strategy package which is specific to a provider. Eg `passport-google-oauth20` for google.
   2. You need to pass a client Id and client secret to google. For that you need to register yourself with google. You can do that by visiting [this](http://console.developers.google.com).
      - Then we create a new project.
      - Now we enable `Google+ API`(This has now been depricated so no need for enabling).
      - Then we create credentials for OAuth to get `client Id`(Public key) and `client secret`(Private key). Refer diagram `02 > 018` to see how we keep this private in production.
      - Update OAuth consent screen.
   3. `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=387595123288-p1afja9upeeicjbb9a7gk6neocio5941.apps.googleusercontent.com`
      - response_type: code (This is to tell google to send the code for the user which will be used to fetch the profile)
      - redirect_uri: http://localhost:5000/auth/google/callback
      - scope: profile email(This tells the kind of permissions or information of user).
      - client_id: 387595123288-p1afja9upeeicjbb9a7gk6neocio5941.apps.googleusercontent.com

## REACT

## REDUX

## MONGO

```

```
