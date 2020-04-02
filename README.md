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

## Payment Gateway(Stripe + MongoDB)

## Campaign Creation(React + Redux)

## Email Survey(Email Provider)

## Tabulation and Report creation from survey(Email Provider + Express + Mongo + React + Redux)

# Take Aways

## Heroku

### Checklist :

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

```

## NODE

1. Express App : `express()` creates a express app. This app remains common throught the application.

## REACT

## REDUX

## MONGO
```
