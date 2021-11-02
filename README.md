# API Server JWT Auth
A basic template for a server token authorization

## Routes

| Model | Type | Route | Description | Body JSON |
| :---:| :---: | --- | --- | --- |
| USER | GET | /users/all | Get all users | - |
|  | GET | /users/**:id** | Get user by its id | - |
|  | POST | /users/ | Create a new user | User model |
|  | PUT | /users/**:id** | Update an user by its id | User model |
|  | DELETE | /users/**:id** | Delete an user by its id | - |


## Installation

Install dependencies:

```
npm i
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
