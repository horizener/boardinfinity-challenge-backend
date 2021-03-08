My solution for BoardInfinity Challenge

to start this project use npm start

the project includes 3 js files, index.js is the main file, then we have mongoose.js in src/db which contains connection to mongoose client in my local db
if you want to connect to db use '/mongodb/bin/mongod.exe --dbpath=/mongodb-data' this will initiate a connection to mongodb server in your local machine
secondly the data stored in db was based on schema that is mentioned in newuser.js in src/models  

Tasks

1. Non-digital need to convert into digital forms
A. for this i have assumed that the incoming data will be from a pdf file and since i could not find a caste certificate i used a sample pdf file to parse the data and console log its content and it was working fine. In this the user will upload a file from POSTMAN and status will be sent after uploading the route for this answer starts from index.js:80  POST - '/upload'.

2. A new cast certificate automatically converts into a digital format and saves it.
A. i assume that digital format is just data in databases therefore i add a route for simply storing data from user after passing data from POSTMAN the route can be found on line 16 on index.js POST - '/newuser'

3. When a government employee wants to verify the certificate he/she can verify in two ways by typing a unique number as well as the image of the certificate.
A. For this i created route GET - '/verifyuser/:id In this when a employee use a id for verifying details it will send whole details of the user. image creation with the user data could not be done due to time constraints


4. Now there should be an admin dashboard where higher authority can check the digital certificate count, total certificate converted from non-digital to digital
A. i have added 2 seperate route handlers for this but the database is same and uniformity in db is maintained. i have added a field called c-type in mongoose model that sets null as default value when a non-digital certificate is sent and when we create a new user then we pass c-type: digital as a JSON object and used user.find({c-type}).countDOcuments() to get a count from both of these. the routes can be found from  index.js 39-60

when a user add a non-digital certificate the files would be added in the certificates folder
