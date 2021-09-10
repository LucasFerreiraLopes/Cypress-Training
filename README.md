# Cypress-Training


## What I've learned
I choosed a week event called "Semana Agilizei" to be my first course and introducing at Cypress tool, and it went beyond my expectations.

In that course i learned about HTML Dom, how to navigate in html elements, and how to make assertions on them. I also learned about local browser storage and how to use it to make my test run more symptomatic, using Json files.

At the end of the project, when I thought that nothing new could come, I was surprised by the use of Cypress Dashbord, and how it helps in monitoring the tests runnings, we've learned about Github Actions and how it works, and we implemented our test routine to automatically run at each commit.


## What the project does

We used a web application for financial organization to implement our automated tests, the application work with a incomes and expenses, and manually enter the values, after that a total value is calculated, you can check the application in this URL : https://devfinance-agilizei.netlify.app/#.

Running some test cases where we enter the manual values, we identified that we can improve the test time, and how we made that? Well, this is where we make use of the browser's local storage, we created a javascript file to store a function, and in that function we sent a Json file that generates random numbers of incomes and expenses, so we no longer need to use the "Get" command in the field and define what will be typed. This implementation has reduced the time test run by almost 200%.

