require('dotenv').config();
module.exports = {
    baseURL: 'https://automationexercise.com',
    productsURL: 'https://automationexercise.com/products',
    testEmail: process.env.TEST_EMAIL,
    testPassword: process.env.TEST_PASSWORD
};