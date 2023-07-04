# Craftsy

Craftsy is a React-Flask full-stack e-commerce application. All users can browse the products available, add and remove items from their session cart, update the quantity of products in their cart, and check out using Paypal, Venmo, or a debit-card card. Users can create an account or login with their Google credentials. Authenticated users can leave product reviews and can edit or delete their own reviews. The ceramic products listed on this site are actual products for sale - created by Doyle and Sandy Sebold out of their home business in La Junta, Colorado.

## Installation

For local installation, fork and clone this repository, then cd into your project folder and run the following commands:

`npm install --prefix client`

`pipenv install requirements.txt && pipenv shell`

Create a .env file at the root of your project directory. You'll need to configure your own database, Google developer console credentials, PayPal developer console credentials, and secret key for all of the application functionality to run.

Use the following .env variables and populate with your information:

SECRET_KEY (random secret key for your app)

DATABASE_URI (from the database you'd like to connect)

GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET (register for a Google Developer account and configure for your application first)

PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET (register for a PayPal Developer account and configure for your application first)

Once your application is configured with the proper variables in your .env file, to run the React and Flask applications simultaneously, run the following command:

`honcho start -f Procfile.dev`

The React front end will be available at localhost:4000; the Flask backend will be available at localhost:5555

## Usage

Users can browse products and check out as a guest, create an account by signing up on the Sign Up Page, or login with Google credentials to create a local account on Craftsy. Only authenticated users can leave product reviews. All users can shop the product catalogue, add/update/delete items from their cart, and complete the order checkout process using PayPal, Venmo, or a credit or debit card. Authenticated users can create, edit, and delete reviews for each product on the product page. Once leaving a review, the average rating for the product will update to reflect the new rating and will be displayed on the front of the product card. 

## Final Thoughts

Building this application to utilize Google authentication and PayPal was a huge milestone for me as a developer. I hope other developers can check out the front to backend logic I utilized and can try it out in their own applications. Thank you for checking out Craftsy!