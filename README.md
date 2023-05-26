# Front-end Project

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)

This project requires implementation of TypeScript and SASS.

## Requirement

1. Use the API endpoint [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/) to create an e-commerce website. Read the documentation and learn how to use the different endpoints.
2. Create at lease 4 pages (can be more if you want): Home page, product page,
profile page (only available if user logins), and cart page (cart could be a page or a modal)
3. Create Redux store for following features:
    - product reducer: get all products, find a single products, sort products by
    categories, sort products by price. Create, update and delete a product (enable update & delete features only for admin of the webapp. For example, you can check if user is your admin account before let them delete product)
    - user reducer: Register and Login
    - cart reducer: add product to cart, remove products, update products's quantity in cart
4. When adding routers to your application, programatically set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.
5. Deploy the application and rewrite README file.

## Bonus

1. Use context API to switch theme
2. Implement unit testing for the reducers

## Instruction to start the project

In the project directory, you can run:

### `npm install`

Install all the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Project result


### Working features
- Display products, with filter & sort by price, also with options to set limit of products per page
- Search products by name (with debounce)
- Add products to cart, update quantity, remove products from cart
- Sign Up Form validations
- Custom Error Page
- Basic tests for reducers

### Known limitations
- Authentication for Log in, Sign up & Google Log in are not ready yet
- Can not filter products with both categories & prices yet
- Functions specified for Admin role are not completed, e.g. product add/update/delete
- Private/protected routes for wanted page is not available, e.g. profile page should be visible only when user is logged in

### Areas for enhancements
- Filter by price range 0 - 400 does not return correct results, rest options are correct
- Save cart data into local storage (current received error: "Cannot read properties of undefined (reading 'reduce')")
- Improve stylings

### Photos
Filter and sort products by prices
![Filter and sort products by prices](./src/assets/demo%20photos/filter%20%26%20sort%20products%20by%20prices.png)
Search products by name
![Search products by name](./src/assets/demo%20photos/search%20products%20by%20name.png)
Notification at bottom left when add product to cart successfully
![Notification at bottom left when add product to cart successfully](./src/assets/demo%20photos/cart%20update%20with%20bottom%20noti.png)
Cart page
![cart](./src/assets/demo%20photos/cart.png)
Sign in/Sign up Form
![Sign in Sign up form](./src/assets/demo%20photos/sign%20in%20sign%20up.png)
Validations when sign up 
![sign up validation](./src/assets/demo%20photos/sign%20up%20validation.png)
When user log in successfully, sign in / sign up page turns into profile page
![user logged in](./src/assets/demo%20photos/user%20logged%20in.png)
After user log in
![logged in screen](./src/assets/demo%20photos/logged%20in.png)
