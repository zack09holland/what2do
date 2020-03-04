# What2Do
What2Do is the second iteration of our Where2 Project. This site is an aggregation based search engine for locating Restaurants and Events for an upcoming vacation. Users can create an account which will allow them to save events and restaurants that they would like to visit during their trip. More features are to come including creating multiple itineraries for other trips later in the year!

## Website:
[What2Do](https://what2do-project.herokuapp.com/)

### How-To:
Steps for Using the Site:
1. Select a Start Date (the application will default to Today)
2. Select an End Date (the application will default to 7 Days from Today)
3. Enter a Destination: City around the World (this is backed by Google Places API - and will only accept known Google Locations)
4. Select a Search Radius (default is 10 Miles; Up to 100 Miles by 10 mile increments)
5. Click Search...
6. If a user would like to save events or restaurants to be viewed later, they can click the login button which will allow them to create an account
7. Favorites are saved by the account created and can be deleted later

### Technologies Used:
- Google Places - API \ Library - Used for Destination Resolution - Reduces chances of unresolved locations
- Passport - Used to authenticate users
  - * When User is Authenticated - User Account created for Favorites in Realtime Database *
- Bootstrap - Primary CSS - Modal, Accordian, Carousel, Grid, Button, Form Control
- Handlebars - Used to populate pages from JSON objects from the API requests as well as from our database
- Sequelize - Used to query, create and delete data from our database
- Node.js
- Express.js
- Moment JS - Used for the Ticketmaster API to format Time properly for queries
- Yelp API - Used for Restaurant Results
~~- Zomato API - Used for Restaurant Results - Had plans to use thier other API's for Restaurant Results but ~~
- Ticketmaster API - Used to collect Events for a location





