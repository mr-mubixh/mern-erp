# API Authentication using NodeJs

This is an Authentication API using JWT's. Email & Password is used for authentication.

The API based on Node.js, Express, MongoDB, following the **MVC pattern**.

**Mongoose** is used for storing Users in Database.

---

## To start setting up the project

Step 1: Clone the repo

```bash
git clone https://github.com/mr-mubixh/mern-erp
```

Step 2: cd into the cloned repo and run:

```bash
npm install
```

Step 3: Put your credentials in the .env file.

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=YOUR_DB_NAME
ACCESS_TOKEN_SECRET=GENERATE_FROM_GENERATE_KEYS_FILE_IN_HELPER
REFRESH_TOKEN_SECRET=GENERATE_FROM_GENERATE_KEYS_FILE_IN_HELPER
```

Step 4: To generate 256-bit keys for JWT

```bash
node ./helpers/generate_keys.js
```

Step 5: Install MongoDB (Linux Ubuntu)

See <https://docs.mongodb.com/manual/installation/> for more infos


Step 6 (Optional): Change the expiration time of Access Token and Refresh Token according to your needs by going inside the **`./helpers/jwt_helper.js`** file.

## License

This project is licensed under the MIT License.
