# API Server JWT Auth
A basic template for a server token authorization

## Models

### User

| Parameter | Type   | Description   |
|:----------|:-------|:--------------|
| email     | string | User e-mail   |
| pass      | string | User password |

## Routes

| Method | Auth | Path             | Description         | Body JSON                                                         |
|:------:|------|------------------|---------------------|-------------------------------------------------------------------|
|  GET   |      | /                | "Hello World"       |                                                                   |
|  POST  |      | /register        | Create a new user   | [User](https://github.com/eperezcosano/auth-server-template#user) |
|  POST  |      | /login           | Generates a new JWT | [User](https://github.com/eperezcosano/auth-server-template#user) |
|  GET   | JWT  | /validate        | Validate JWT        |                                                                   |
|  GET   | JWT  | /dashboard/      | Protected route     |                                                                   |
|  GET   | JWT  | /dashboard/users | Get all users       |                                                                   |


## Installation

Install dependencies:

```
npm i
```

Add .env file:

```
MONGO_URI=<mongo uri string>
PORT=<server port listening>
JW_SECRET=<json web token secret>
JW_EXPIRATION=<in seconds>
```

Run node project:

```
node index.js
```

## Technologies

- node.js
- express
- mongoose
- jwt

## Author Info

Izan Pérez Cosano (https://github.com/eperezcosano)
