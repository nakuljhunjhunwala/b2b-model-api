# B2B model Api System

### Use of Linux Subsystem is recommended as the project may not run or break in windows environment

## Installation

- Clone this repository in your system
- Install node modules with **`npm install`**
- To run the project the run the command `npm run debug`
- Change **.env.example** to **.env** file and add the environment variables

  - Available environmental variables
    **MONGODB_URI=
    SECRET=**

- You can can connect any of your Mongo Database with any secret to start with

## Postman collection Link

You can import all the apis related to this project from this [link to collection](https://www.getpostman.com/collections/3ff7039284f86b589ebf)

### Points to remember

Every time you try to run a an api you have to share the header with name **auth-token** which will be provided to you while login or sign-up

## About

Thier are 2 users to begin with either user is admin or a customer

#### For Website Owner:

1.  Add account
2.  Add products
3.  View Orders

#### For End Customers

1.  Add account
2.  Login
3.  Browse Products
4.  Order products(no payment integration)
5.  View Orders
