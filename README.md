# Supine

## A web app integrated with SMS messaging and secure payments

## Functionality
1. Allows customers to view menus and pre order 
2. Restaurant will receive a SMS message with order details
3. Restaurants can send time estimates and notes via SMS to the customer through the restaurant page /restaurant 
    -there is no access to this page via the customer experience, restaurant must got to the url /restaurant
4. Customers can either make a secure payment once the order is placed or choose to pay at the restaurant
5. Orders and customer information are stored in a server side database
6. Customer phone numbers are not shared with the restaurant 

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`
9.  You will need a twilio authorization token to use the SMS functionality
    - you can get a free trial account at twilio.com
    -store this is as new file called secrets.js in this format
        module.exports = {
         TWILIO_TOKEN: "f63f1d09db06433xxxxxxxxxxd25c189"
        };

## Dependencies

- body-parser 1.15.x or above 
- dotenv 2.0.x or above
- ejs 2.4.x or above 
- express 4.13.x or above 
- knex 1.14.x or above 
- knex-logger 1.1.x or above 
- morgan 1.7.x or above 
- node-sass-middleware 0.9.x or above 
- pg 6.0.x or above 
- sass 1.0.0-beta.5.x or above 
- stripe 5.4.x or above 
- twilio 3.11.x or above 

/ DEV
- Node 5.10.x or above
- NPM 3.8.x or above

## Screenshots

!["Homepage"  ](https://github.com/swiftsimon/supine/blob/master/docs/Supine-main.png?raw=true )
!["Menu Page"  ](https://github.com/swiftsimon/supine/blob/master/docs/Supine-Menu.png?raw=true )
!["Customer order confirmation"  ](https://github.com/swiftsimon/supine/blob/master/docs/Supine-Order.png?raw=true )
!["Secure payment page"  ](https://github.com/swiftsimon/supine/blob/master/docs/Supine-pay.png?raw=true )
!["Restaurant receives order SMS"  ](https://github.com/swiftsimon/supine/blob/master/docs/Supine-rest%20text.jpg?raw=true )
!["Customer receives order update"  ](https://github.com/swiftsimon/supine/blob/master/docs/Supine-cust%20text.jpg?raw=true )
