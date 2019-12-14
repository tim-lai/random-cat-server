## Available Scripts

Install dependencies:
### `npm i`

In the project directory, you can run:

### `npm start`

Alternatively, you can run both the server and client via a single script, subject to the notes below

### `npm run start-dev-server-client`


## Additional Notes:
1. There exists a package script to concurrently run this express server and the associated Create-React-App (CRA). The path defined in `start-dev-server-client` script should be adjusted as needed. The CRA can be nested inside this project's `/client` directory, or it can be outside this project. Please adjust the path accordingly.

2. API endpoint to login user currently returns a res.cookie and a duplicate copy in res.data.data.accessToken. Current front-end implementation expects this res.data cookie value.

3. Endpoints
* There exists a baseUrl for versioning. e.g. for the url,`localhost:3010/api/v1/cat`, the baseUrl is `/api/v1`.
* Response format: `res.status(200).json({ message, data, error })`. If the endpoint can understand the request, expect a 200 status. Successful responses as expected by client will receive a `message` and `data`, and no `error`.
* GET `/cat-image` endpoint retrieves an image specified in query params. If no query params are provided, this endpoint will return a result based on a hardcoded `image_id`. (This hardcoded `image_id` was a development feature, and would be an area of improvement for a more complete demo).
* GET `/cat` endpoint returns a list of images if query params are provided. If no query params are provided, this endpoint will return a random image. This endpoint is used by the CRA, and the naming convention is maintained to match the CatAPI endpoint convention. This endpoint expects a cookie value in the request as an authenticated route.
* GET `/login` endpoint expects a cookie value in the request, and no query params.
* POST `/login` endpoint will attempt to login the user based on provided credentials

4. The `.env` file is used to hide api keys, as well as the demo username/password/key. It is ignored in git. Please do not commit your `.env` file. A `sample-env` has been provided.
```
#CatApi key
CAT_API_KEY
#login.password, also cookie secret for demo purposes
COOKIE_SESSION_KEY
#login.username
COOKIE_SESSION_USER
#cookie id for demo purposes
COOKIE_ACCESS_ALLOWED_ID
```
