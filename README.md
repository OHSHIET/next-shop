# Next Shop
![Next shop design](https://i.imgur.com/2C3skIG.png)
#### Video demo: [link](https://www.youtube.com/watch?v=D1nL2I5A-G8)

## Description
This is an online shop I made using Next.js, React, PostgreSQL with Prisma, Next Auth, SASS, Bootstrap, and other stuff. 

I made this project to become more familiar with Next, React and databases overall. It was a final project for the CS50 Introduction to Computer Science course.

## Features
All the products are split into categories, which you can see in the left hand corner of the page. By default "All products" is chosen, so you can see everything you can "buy" - I didn't implement neither the price, nor the buy feature, nor the specific page for every product. First of all, funnily enough, I just forgot about the price, and recalled it only when finishing the project. I thought adding the price and the buy feature would be boring and would just waste my time, since it's writing code for things I already know how to do. The pages for products would be more interesting, however I already did something like this when doing my [Jester messenger project](https://github.com/OHSHIET/jester-messenger).

You can add products to your cart, and then check what's in your cart by clicking the button in the navbar.

The search feature allows you to search for any product, whether the text you typed is in product's name or in product's description.

Feature only available to the user with name "superuser", is the admin page, which also appears to them in the navbar, - there you can add new products right on the website without having to use the prisma studio. For the images you have to use links, I didn't want to implement the database with actual images, because, as mentioned before, I already did that in my messenger project.

And another feature is a custom sign in page, which also server as sign up.

I did a lot of design for the shop when I started creating it, but in the end I didn't know where all these links should point to, so I just left them, because I wasted time designing them (especially links in the footer, the top ones are from Bootstrap). As I said this project is more for me to learn backend, not to do design.