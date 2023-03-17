# E-Commerce Website

A simple e-commerce website built with an ExpressJS backend and React frontend.

## Backend

Prisma ORM interfaces with a PostgreSQL database storing products, users, user sessions, and user carts. Express-session and Passport.js manage user sessions and authentication.

### Testing

Unit and integration tests are written with Jest. SuperTest is used for requests. The database is cleared before each test or between test suites depending on test requirements.
Two Prisma schema files correspond to a "public" schema for development and a "test" schema for testing. Running "dev-init" or "test-init" will reset the given database and prepare for development or testing.

## Frontend

React app uses React Router and Styled Components allowing a user to view a feed of products. A user can sign in or register to add products to their cart. Product quantity can be updated from the cart page. User profile details can be updated from the profile page.

# To Do

Checkout, view orders
Playwright tests
Admin gui functionality
Third party login
