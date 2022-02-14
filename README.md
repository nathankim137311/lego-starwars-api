# Lego Star Wars API

## Description 
A RESTful API that serves product data from Lego.com.

## Demo
![endpoints](https://user-images.githubusercontent.com/46698958/153804952-60162e38-79bf-477c-b6a2-811abcec01a2.gif)

## Features
* Pagination
* Web Scraper

## Technologies 
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## Questions

### What was your motivation? 
I wanted to learn as much as possible about how to create a RESTful API so that I can create full stack applications. 

### Why did you build this project? 
The idea came from the result of a week of binging old Lego stop-motion videos on Youtube. I decided that I wanted to create a RESTful API so that I can recreate the Lego website.

### What did you learn? 
* Learned how to create a RESTful API with Express and Node. 
* Learned how to create routes and pagination for my API. 
* Learned how to extract data from any web page with a web scraper (Puppeteer)
  
## Challenges 
* Scraping 
* Cloud Storage
* Pagination 

### Puppeteer 
I was completely new to web scraping so I really had to dive deep into the documentation to learn as much as possible. At first I used Puppeteer and then I went to a no-code solution with Octoparse. I thought Octoparse would be easier to use, but there was limited configuration, I ended up going back to Puppeteer for extracting product data. 

### Cloud Storage
At first, I used GCP for hosting my server instance, but the learning curve was steep and I encountered a lot of problems with GCP and Heroku. In the end, I decided to go with MongoDB Atlas for my database. 

### Pagination
Implementing pagination to my project was very difficult but I managed to watch a few tutorials and got it to work with my API.

## Reflection

If I were to do this project again, I would have planned out the design and product schema. I only noticed this while I was building my Lego Clone. I would also add a schedule to my web scraper so that it will return the latest products. Next time, I would add some sorting and filtering routes to my API, to give it more functionality.  

