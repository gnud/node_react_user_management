# Project User manager API (BACK-END)

A project providing an API that can manage users.
To be used in parallel with a React based UI.

# Project features

## Architecture overview

- Backend powered by nodejs
- Using MVC pattern, having Separation of Concern (where possible)
- A docker compose, for PG database service
- JWT middleware for authentication
- Endpoints:
  - root 
    - Sample root
    - Routes can be used by guests 
  - auth
    - Routes can be used by guests
  - user (FULL CRUD)
    - All the routes are protected using authentication

## Technologies
nodejs
docker
docker compose
postgres

## Frameworks

- Expressjs web framework to power a REST API

# Mechanisms

- logging (file based logging system)
- JWT authentication based on jsonwebtoken
- env variables using .env file (for production can be change to just use docker environment vars)

# Development

## First time setup

copy the .env.sample as .env.

edit the variables to suit your needs.

```shell
 docker-compose up -d
```

This will start the db services defined in docker-compose. 
Now, we have a Postgres database available.

Seeding data

```shell
sequelize db:seed:all --debug
```

or 

```shell
npm run seed
```
Note: this will create a db if it doesn't exist.

Now we have demo user data.

## Creating a new model

```shell
sequelize model:generate --name User --attributes name:string,email:string,phone:string,password:string,status:string,last_login_at:date
```

## Model Migration

```shell
sequelize db:migrate
```

## Testing

```shell
npm test
```

Note: env-cmd loads the .env file to set secret keys and stuff, so you don't need to set any env variables.

# API

Something to make up for being lazy and not integrate a Swagger API browser.

### Routes

### Route /auth

- /login

```shell
curl --request POST \
  --url http://localhost:3000/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "root@example.com",
	"password": "password"
}'
```

- /register

```shell
curl --request POST \
  --url http://localhost:3000/auth/register \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Petko",
	"phone": "+38970123565",
	"email": "petko@example.com",
	"password": "z1x2!c3v4$"
}                                                                  '
```

### Route /user

- LIST /user

```shell
curl --request GET \
  --url http://localhost:3000/user \
  --header 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTk5LCJpYXQiOjE2NDA4NTI4MzgsImV4cCI6MTY0MDkzOTIzOH0.-9fqlZHY0S2w1aODR1gHsjV8v3vnllmNF5HZO65J3_k'
```

- CREATE /user

```shell
curl --request POST \
  --url http://localhost:3000/user \
  --header 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTk5LCJpYXQiOjE2NDA4NTI4MzgsImV4cCI6MTY0MDkzOTIzOH0.-9fqlZHY0S2w1aODR1gHsjV8v3vnllmNF5HZO65J3_k' \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Petko1",
	"phone": "+38970123565665664y66y7t835",
	"email": "pe67tko13666g785y65hy6766@example.com",
	"password": "z1x2!c3v4$"
}                                                                  '
```

- READ /user/:userId

```shell
curl --request GET \
  --url http://localhost:3000/user/1 \
  --header 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTk5LCJpYXQiOjE2NDA4NTI4MzgsImV4cCI6MTY0MDkzOTIzOH0.-9fqlZHY0S2w1aODR1gHsjV8v3vnllmNF5HZO65J3_k'
```

- UPDATE /user/:userId

```shell
curl --request PATCH \
  --url http://localhost:3000/user/17 \
  --header 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTk5LCJpYXQiOjE2NDA4NTI4MzgsImV4cCI6MTY0MDkzOTIzOH0.-9fqlZHY0S2w1aODR1gHsjV8v3vnllmNF5HZO65J3_k' \
  --data '{
	"name": "Petko4",
	"phone": "+3897012365475"
}                                                                  '
```

- DELETE /user/:userId

```shell
curl --request DELETE \
  --url http://localhost:3000/user/46 \
  --header 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTk5LCJpYXQiOjE2NDA4NTI4MzgsImV4cCI6MTY0MDkzOTIzOH0.-9fqlZHY0S2w1aODR1gHsjV8v3vnllmNF5HZO65J3_k'
```

# TODOS

- Documentation (e.g. Swagger, JavaDoc)
- Search functionality (or filtering)
