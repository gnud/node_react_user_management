# Tech interview 

## Tech stack
For the project the following stack provided:

Back-end:
* ~~Spring Boot~~ -> Express.js
* ~~Hibernate~~ -> Sequelize.js
* ~~JPA~~ -> Sequelize.js
* ~~Lombok~~ -> docker compose
* ~~H2 database~~ -> Postgres

Front-end:

* React (With hooks) [x]
* React Router [x}]
* Yarn
* Axios [x]
* Formik (feel free to replace with preferred lib) [x]
* Yup (for form validation) [x]
* react-router-dom library for routing [x]


## Task

You need to create a page(s), where the user can create users, edit them, select one and delete. You need to create 
both, front-end and back-end and have this functionality as a functional unit. If you are more focused to front-end
please make front-end functionality as nice as possible (e.g. cover with tests, make it responsive etc). On the other hand, 
if you are back-end focused, do the same with Spring (e.g. implement model mappers).

For easier start, we created user entity and seeded it (using faker) to H2 database, so you already have some users 
that you can fetch from the database.

- You need to create a table and list all users [x]
- Add a page, where the user can be created [x]
- Add a page where the user can be updated [x]
- Make a button (maybe with alert dialog?) to delete a user [x]
- Make it possible to view a single user (e.g. modal or another page) [x]

### Minimum functionality

- Functioning API [x]
- Usable front-end [x]

### Bonus points
- Unit tests
    - Implemented on the backend only due to time constraints.
- Documentation (e.g. Swagger, JavaDoc)
  - Time constraints, but I can implement it, but you can take a look at the Insomnia Rest dump.
- Search functionality (or filtering)
  - Time constraints, but I can implement it
- Usage of prop-types


### Setup Instructions

Instructions are defined in webapp and api, in it's corresponding README.md files.
