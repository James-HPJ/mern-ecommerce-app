# MERN Ecommerce App

The MERN Ecommerce App is a full-stack ecommerce application built using the MERN (MongoDB, Express, React, Node) stack. The application allows retail customers to browse aquarium products, add them to their cart, and place orders. It also has an admin section where authorized users can manage products, categories, and orders.

You view the fully deployed website/app [here](https://hpj-mern-aquariummart.web.app/).

### Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Development Thoughts](#development-thoughts)
- [Contributing](#contributing)

### Features

The MERN Ecommerce App comes with the following features:

User authentication and authorization for retail customers and admin users
CRUD (Create, Read, Update, Delete) operations for products, categories, and orders
Search functionality for products
Shopping cart with the ability to adjust quantities, remove items, and view totals
Payment integration with PayPal

### Technologies Used

The MERN Ecommerce App is built using the following technologies:

- MongoDB
- Node.js
- Express.js
- Express Validator
- React
- React Router v6
- Redux & Redux Toolkit
- React Bootstrap
- JSON Web Tokens (JWT)
- Bcrypt

### Getting Started

To get started with the MERN Ecommerce App, follow these steps:

#### Prerequisites

Node.js (v12.0 or higher)
MongoDB

#### Installing

Clone the repository:

```
git clone https://github.com/James-HPJ/mern-ecommerce-app.git
```

Install server dependencies:

```
cd mern-ecommerce-app
npm install
```

Install client dependencies:

```
cd client
npm install
```

Create a .env file in the root directory of the project and add the following environment variables:

```
PORT=<to your backend hosting server>
REACT_APP_BACKEND_URL=<to your backend api>
DB_USERNAME=<your_mongodb_username>
DB_PASSWORD=<your_mongodb_password>
DB_COLLECTION=<your_mongodb_collection>
JWT_SECRET=<your_jwt_secret_key>
```

Start the server:

```
npm run server
```

Start the client:

```
cd client
npm start
```

#### Usage

Retail Customer

As a retail customer, you can:

- Browse products
- Search for products by name
- Add products to your cart
- Adjust quantities or remove items from your cart

Admin User

As an admin user, you can:

- Manage products by adding, editing, or deleting them
- Manage categories by adding, editing, or deleting them
- Manage orders by viewing details or changing order status

To access the admin section, you must be authenticated as an admin user. This can be done by setting the isAdmin field to true when registering a user account in the MongoDB database.

#### Development Thoughts

Having done MERN apps since 2021, there are some changes in developing code especially in the Frontend with react-router-dom v6. This new version provides us with more tools (think loaders, actions, and other hooks). Submitting form has been more integrated with react router's `<Form>` component, and data can travel both ways in component more seemlessly. Loaders also help with rendering dynamic components before the rendering cycle begins, and this may achieve a better user experience in the front.

On the Backend side of things, express has always allowed coders like myself to write up code so much faster. The many packages that work together with express also speeds things up like Express Validators does for request body validation.

For authentication, I chose to use JsonWebTokens and bcrypt to protect routes on both frontend and backend. There may be easier authentication methods like Express Passport, but I wanted to revise the foundations of authentication by writing my own authentication code.

#### Contributing

Contributions to the MERN Ecommerce App are welcome! To contribute:

- Fork the repository
- Create a new branch
- Make your changes
- Commit your changes
- Push your changes to your fork
- Submit a pull request
