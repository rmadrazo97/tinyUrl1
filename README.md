# tinyUrlGit
# The project
 Description:
 <br>
 This project, receives a url as an input, returning a short url, which consists of a unique identifier stored in a database. When accesed to this url, using the record identifier, the application gathers the original url, tracks data and redirects the user. 
# How to Try it:
Download or clone the repository, then run `npm install` <br> After installation run `npm start` <br? The project will be running on port 8080 of your local host. To try, tiny urls, you must paste the tiny url generated after the main url, example>> `localhost:8080/url/get/1rvXAfR` <br> To try the api you must navigate to `localhost:8080/api/"yourlongurl"` and it will return the tinyurl. <br> For traking urls, you can navigate to "all Urls" which shows a record of all urls generated within the application. <br> In order to track a single Url, you cmust navigate to "Track Url" and paste the tiny identifier generated in this case: 1rvXAfR, this will show the data stored in this record. <br>
# How to Try it -Online:
Navigate to: https://8080-dot-4589138-dot-devshell.appspot.com/ and follow the instructions above, instead of the installation process. 
# Tools for Development
## Runtime
 Node.js
 Javascritp runtime built on chrome's V8 Javascript engine.
## Framework
 Built Using Express framework. 
## Data base
 MongoDB
 Using MongoLab (Database as a Service)
## Templating Engine
 Handlebars
