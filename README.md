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

### Complete Flow

![Screenshot 2020-04-11 at 11 18 03 PM](https://user-images.githubusercontent.com/46783722/79050922-d919eb00-7c4a-11ea-8bf3-55a95126776a.png)

### Architecture and Flow(02 > 003)

Refer diagram `02 > 003`, `02 > 009`,`02 > 010`,`02 > 011`,

1. User comes to our site and tries to login using google. He is taken to `http://localhost:5000/auth/google`.
2. He is redirected to `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=airbnb.apps.googleusercontent.com`. Here he logs in using his id and password.
3. After authentication he is sent to the callback url ie `http://localhost:5000/auth/google/callback` with a code.
4. Using this the application fetched the user profile from google.
5. Then this profile is save in the database. This is done so that the user can be recognized the next time he/she logs in.
6. Then a unique Id is created for this user and it sent to the client. This is done by serializing some user info.
7. The client uses this unique id for authenticating itself. It is shared amoung different request by cookies. To understand the cookie flow please refer `02 > 015`.

### Security Risk

- Hackers can use this flow to get some user infromation which the user is not willing to share. One of the case is discussed below.
- **Case**

  1. A hacker send you a clickable image on your email saying `AirBnB offers.
  2. Once you click this image it takes you to `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=airbnb.apps.googleusercontent.com`. Notice here redirect_uri is `http://localhost:5000/auth/google/callback` and clint_Id is `airbnb.apps.googleusercontent.com`. Since client_Id is public so anyone can send anyones clientId.
  3. Not the user gets redirected to google oauth login page showing this is request from airbnb, whereas its redirect url is forget my hacker to his own website.
  4. This way the user unknowing shares his profile info with the hacker.

- To prevent this google first maps the redirect url with the list of url provided by airbnb in its account.

## Payment Gateway(Stripe + MongoDB)

### Rules of billing

1. **Since we are bad at security** :
   - Never accept raw credit card numbers
   - Never store credit card numbers
   - Always use an outside payment processor
2. **Billing is hard** :
   - Possible to avoid montly payment plans. Generaly it becomes difficult to maintain a billing system which is on a monthly basis. Let take a scenario where a user initialy takes a GENERAL plan with 50 emails a month and after sending 40 emails asks to upgrade the plan to PREMIUM which offers 100 emails a month. It becomes difficult to hande such a situation. Hence it is better to go for a credit based plan.
   - Fraud and chargebacks are a pain. You are bound to have situation where some uses fraud credit card or a user made some payment by mistake. For all these circumstances you will need to have a roleback plan for billing which is a pain.

### Flow(03 > 003)

This diagram shows the flow of payments using stripe.

### Dev

1. First we create a account with stripe
2. We get our public/publishable and secret keys
3. We have used stripe checkout library for payment integration in frontend. There is a library `react-strip-checkout` which has been created on to of stripe checkout specificaly for react applications.
4. We then create a StripeCheckout component and provide some props.
5. `4242424242424242` is the test credit card number.
6. For the backend we use the `stripe` library. We are using the `charges` api for processing the payment at the backend. Refer [https://stripe.com/docs/api/charges/create](this) link for more details.

## Campaign Creation(React + Redux)

## Email Survey(Email Provider)

## Tabulation and Report creation from survey(Email Provider + Express + Mongo + React + Redux)

## Anonymous

- **Http is stateless** : No 2 http request by default share any state or information. For authentication the server needs to know if the http request comming are from an autherised user or not. For this it needs all the request to carry some information which proves that it is comming from a trusted and authenticated source. This information is some unique Id for every individual user which the server sends as a cookie or a token etc.

  1. In the response the server sends a header `Set-Cookie:aasdf`.
  2. The browser reads this response and with every successive request sends this value in the cookie. The cookies are automaticaly managed by the browser and are sent with every successive request. Although there are some downsides to using cookie based approach.

- **Dev and Prod env** :

  1. We should always maintain different configuration for our dev and prod env. The reasons are listed below :

     - **Security** : If some one gets access to you laptop which has all the keys then you have a great risk of loosing your prod env(GoogleAPI,DB etc). Also even if you accidently commit the keys in your code you don't need to worry since its only keys of dev env. You should always maintain the prod keys in which ever deployment platrom you are using(AWS,Azure,Heroku etc).
     - **Database** : For production we need an absolute clean set of data. For this reason it a must to have a dev database to do testing and development.

  2. We maintain 2 separate files for dev and prod config namely `dev.js` and `prod.js` in the config folder. There is another file `keys.js` where we check if the environment in dev or prod and based on that return either dev or prod config. Heroku by default exposes the environment in the `NODE_ENV` variable.
  3. dev.js keeps the config value in it whereas prod.js gets them from the environment variables.
  4. We need to commit keys.js and prod.js so that they can also be deployed.

- **MongoDB Atlas** :

- **Google callback protocal to https from http** : This issue we are facing is that a callback url `http://calm-meadow-57498.herokuapp.com/auth/google/callback` is being passed to google instead of `https://calm-meadow-57498.herokuapp.com/auth/google/callback`. This means the protocal being sent is http and not https even though we are at `https://calm-meadow-57498.herokuapp.com/`.

  - **Reason** :
    1.  We are providing a relative callback path to GoogleStrategy.
    2.  Refering the diagram(02 > 029) we can see that our application is running on one of the many server on heroku. They all are behing a proxy server of heroku. Due to this proxy server our google stategy feels that this network is not secure even though we are on https. Therefore it sends a http callback instead of https.
  - **Fix** :
    1. Provide absolute callback url instead of relative url in google strategy. But for this you will have to keep them in config keys since this will change for diff env.
    2. Proviide a `proxy:true` to google strategy.

- **Why 2 servers(04 > 012)** : Express server is only to serve the json. React server is ment to serve the assets. We could also use the express server to build our client and serve it, but it is a tedious task to setup webpack and create-react-app provides this out of the box.

- **Concurently start client and server** : In the package.json of server we add below script.

  ```javascript
    "server": "nodemon index.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  ```

- **Routing b/w client and server on dev** : This is only for development env. where we have 2 separate server for FE and BE.

  1. **Problem Statement** : The user is currently at `http://localhost:3000/`. For google auth we need him to go to `http://localhost:5000/auth/google`. For this we need to provide the absolute url beause relative url will take him to `http://localhost:3000/auth/google`. But our domain will change for different env. One of the solution could be to check at build time if env is dev or not and based on that choose the domain. But this is an overload and additional task.

  2. **Solution** :

     1. Install package `yarn add http-proxy-middleware@0.21.0 --dev` in client directory.
     2. Add file setupProxy.js in client/src folder and add below code

  ```javascript
  const proxy = require("http-proxy-middleware");
  module.exports = function(app) {
    app.use(
      proxy(["/api", "/auth/google"], { target: "http://localhost:5000" })
    );
  };
  ```

  3. **Analysis**
     Refering diagram `04 > 010`. For the relative url added in the setupProxy.js(auth/google, api) file, our client server(webpack server) acts as a proxy and sends the request to the server provided in the setupProxy.js(http://localhost:s5000).

- **Why we didn't take 2 domain approach** : We could also have taken an approach where we had 2 separate domain and hosting for our FE and BE application. But there is are reasons why we didn't take it :

  1. **Cookie scope** : Refer diagram `02 > 013`. The scope of the cookie is limited to the domain. Since we are using a cookie based approach for authentication we can keep 2 separate domain since the cookie generated cann't be shared by domains by default. Although there are apis that allow us to share cookies accross domains but it is a tedious task.
  2. **CORS** :

  - **What is CORS?** : It stands for `cross origin resourse sharing`. This is again a security feature of the browser. If we try to make a request to a domain other than the one we are in, the browser assumes that there is something malicious and prevents this action.
  - **Solution** :
    1. To prevent the CORS issue we will need to make some additional changes in our server code. This will tell the browser which all domains are allow to access the server api.
    2. Set `http://localhost:3000/` as a proxy for requests like `/api` or `/auth/google`. The browser assumes that the request is going to `http://localhost:3000/auth/google` whereas it is being relayed to `http://localhost:5000/auth/google`

- **require vs import** : In require you can add some amount of business logic before making a require call but in case of import you can do that.

- **Routing in production**

  1. On production there is only one server to serve both the client request(static resources) and the server request ie the api request.Please refer `04 > 008` for more clarification.
  2. In order to serve our static file like js,css and index.html in production we need to write some extra code.
     ```javascript
     if (process.env.NODE_ENV === "production") {
       // Express serve static assets in production like main.js
       app.use(express.static("client/build"));
       // Express will serve index.html if it doesn't recognize the route
       const path = require("path");
       app.get("*", (req, res) => {
         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
       });
     }
     ```
  3. **Configure client build process in heroku deployment(04 > 009)** :
     - **Option 1** : Build client on local. Commit the files and push it to heroku. This is not prefered since this makes us commit the build files in your git repository. Also this increase a lot of manual effort to build it every time before deployment.
     - **Option 2** : Make heroku do the build process. The downside to this approch is that by this we are making heroku install all the package like webpack, babel etc which are only needed for development. This is the apporach we are taking for our project. Refer `04 > 010` for flow.
     - **Option 3** : This is the approach of CI or continuous integration. In this approach we make use of a third party server(CI server) to lint,test,build etc our project and then deploy that project to heroku. You can look in `circle ci` for this purpose.
  4. **Making heroku install all dependency and then build our app** : Please refer heroku [https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process](this) for detailed explanation.

# Take Aways

## Heroku

### Deployment Checklist(02 > 017)

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

### Other Imp Commands

1. **heroku logs** : To see the logs if anything goes wrong in deployment.

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
   4. Once you are redirected to your callback the passport handles it and sends the code to google to fetch user profile. After google responds with the profile the callback function in the google strategy is fired with the below arguments
      - accessToken : It is of use if you have asked for so permissions which allow editing user info.
      - refreshToken : Used to create new accessToken incase it expires.
      - profile : User profile
3. **done(err,arg)/next(err,arg)** : This is a function which is just like `next` but for passport. This is invode to tell that the current middleware is done executing and you can load the next middleware. The first argument of this is always an error object followed by arguments.
4. **app.use()** : This is used to wireup middlewares in the application.
5. **Middleware** : Middlewares are functions that can be used to modify request before they are passed to route handlers. We can also say that middlewares are used to do some preprocessing of the incoming request before they are sent to the route handlers. Refer `02 > 04`.
6. **Cookie creation and handling using cookie-session and passport** :

   1. When the request comes back to our application(/auth/google/callback) from google, passport request google to share the profile based on the user code and then fires the callback function in the google strategy(See below code snippet). This validates if the user is new or old and then passes the user to the next middleware.

   ```javascript
   async (accessToken, refreshToken, profile, done) => {
     let user = await User.findOne({ googleID: profile.id }); // Fetch Model Instance
     if (!user) {
       user = await new User({ googleID: profile.id }).save(); // Creates Model Instance
     }
     done(null, user);
   };
   ```

   2. The next middleware is defined in passport.serializeUser method. The result of the serializeUser method is attached to the session as `req.session.passport.user = sadfa234sfasfasf` which is nothing but user.id in the code below. Remember this method is only fired once at the time of sign in and not on every request.

   ```javascript
   passport.serializeUser((user, done) => {
     console.log(user.id);
     done(null, user.id); // This is mongo DB id and not googleId.
   });
   ```

   3. After this the control moves to the next middleware defined for route `/auth/google/callback` as shown in the below code which redirect the user to the dashboard page. Before the response is sent back the `cookie-session` check req.session for any change, encrypts it and sends it as part of response header ie `Set-Cookie` key. cookie-session has a event handler which is fired incase of any change in req.session object.

   ```javascript
   app.get(
     "/auth/google/callback",
     passport.authenticate("google"),
     (req, res) => {
       res.redirect("/dashboard");
     }
   );
   ```

   ```javascript
   app.use(
     cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.cookieKey] })
   );
   ```

   4. Now when the user makes a new request like `/user` it is first intersepted by `cookie-session` middleware. It does 2 things

   - Decrypts the cookies
   - Assings the decrypeted value to the `req.session` property. Which in our case is something like `{"passport":{"user":"5e8ddc1d4b486e787dff8c3d"}}`.

   ```javascript
   app.use(
     cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.cookieKey] })
   );
   ```

   5. After this the controll goes to the middleware added by passpport.initialize() and passport.session() which reach out for the property `passport.user` in `req.session` object and passes it to the next middleware ie
      This middleware is the one defined in passport.deserializeUser which gets this as the first argument and based on this extracts the user from the DB and passes the user to the next middleware inside passport which sets it to `req.user`. This can be used for authenticating the request.

   ```javascript
   app.use(passport.initialize());
   app.use(passport.session());
   passport.deserializeUser(async (id, done) => {
     console.log(id);
     const user = await User.findById(id);
     done(null, user);
   });
   ```

   6. For every successive request steps 4 and 5 work as pre processor. If the user logs out then the complete cycle is repeated.

7. **cookie-session vs express-session(02 > 012)** : For cookie-session the complete user info is kept inside the cookie whereas for express-session on an Id refered as the sessionId is kept in the cookie. This sessionId is then used to extract furter info about the user form some storage(DB). Cookie has a limitation of 4KB so if you have a lot of user info that needs to be part of the session please go for express-session.

## REACT

### React Basic

- Creating env variables in react app for different environments like dev and prod. Refer [https://create-react-app.dev/docs/adding-custom-environment-variables/](this) link for details on how to set env variables. For our app we are using .env file.

### React Router

### Redux

### Anonymous

1. **mapDispatchToProps** : Allows us to excapsulate the dispatch action at a common place. It can be an object or a function. Please refer [this](https://react-redux.js.org/using-react-redux/connect-mapdispatch) for detailed understanding.
2. **middleware** : We can add middleware to a store using addMiddleware. These are like a chain of callbacks which are fired one after the other and finaly the reducers are fired.

## EXPRESS

1. Express out of the box doesn't have any idea on how to handle cookies. So we install a helper library called `cookie-session`
2. Express by default doesn't process the request payload/body like for a post request. For this we need to add another package like `body-parser` which parses the request body and provides it in the req.body object.
3. **Route Specific Middleware** : For this you can add as many middlewares to the route handler. These middlewares are pushed in a queue and are fired one after the other with the help of `next`. Eg in the below code snipet we have added requireLogin as a middleware to first authenticate the route.
   ```javascript
   module.exports = app => {
     app.post("/api/stripe", requireLogin, async (req, res) => {
       console.log(req.body);
       await stripe.charges.create({
         amount: 500,
         currency: "inr",
         source: req.body.id,
         description: "Pay for credits"
       });
       req.user.credits += 5;
       const user = await req.user.save();
       res.send(filterUserFields(user, ["id", "credits"]));
     });
   };
   ```

## MONGO(No SQL database)

1. **Mongoose.js** : Popular library used to interact with Mongo DB.
   - What is mongoose doing for us is in diagram `02 > 007`. `Model class` in mongoose represents a mongo db collection. `Model instance` in monogoose represents a mongo db record.
   - Although mongo db is schema less but mongoose requeires a **Schema**.
2. **How is data stored**(`02 > 006`) :
   - **Collection**: Like tables in RDBMS. Eg users, payments
   - **Records**s: Like rows in tables. Just the difference is that in RDBMS all the rows have same columns or fields. Whereas 2 records may have same of different fields. This is why we call monogdb a **schema less** database.
3. All CRUD operations are async. Eg
   ```javascript
   new User({ googleID: profile.id }).save();
   ```

```

```
