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

Refer diagram `02 > 003`, `02 > 009`,`02 > 010`,`02 > 011`

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

- **MongoDB Atlas** :

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
   4. Once you are redirected to your callback the passport handles it and sends the code to google to fetch user profile. After google responds with the profile the callback function in the google strategy is fired with the below arguments
      - accessToken : It is of use if you have asked for so permissions which allow editing user info.
      - refreshToken : Used to create new accessToken incase it expires.
      - profile : User profile
3. **done(err,arg)** : This is a function which is always the last argument of a middleware. This is invode to tell that the current middleware is done executing and you can load the next middleware. The first argument of this is always an error object followed by arguments.
4. **app.use()** : This is used to wireup middlewares in the application.
5. **Middleware** : Middlewares are functions that can be used to modify request before they are passed to route handlers. We can also say that middlewares are used to do some preprocessing of the incoming request before they are sent to the route handlers. Refer `02 > 04s`.
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

   2. The next middleware is defined in passport.serializeUser method. The result of the serializeUser method is attached to the session as `req.session.passport.user = sadfa234sfasfasf` which is nothing but user.id in the code below.

   ```javascript
   passport.serializeUser((user, done) => {
     console.log(user.id);
     done(null, user.id); // This is mongo DB id and not googleId.
   });
   ```

   3. `cookie-session` see this added variable in the sessions, encrypts it and sends it as part of response header ie `Set-Cookie` key. cookie-session has a event handler which is fired incase of any change in req.session object.

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

## EXPRESS

1. Express out of the box doesn't have any idea on how to handle cookies. So we install a helper library called `cookie-session`

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
