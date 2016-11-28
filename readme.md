## README ##

* Installation Instructions for CNCT application - a Twitter alternative :-)

## What is this repository for?##

* Simple Version of Twitter for Chaser's Technical Task
* Version 0
* Application Name: ** CNCT
![Different Views of Cnct app.jpg](https://bitbucket.org/repo/zEMqa6/images/3810578300-Different%20Views%20of%20Cnct%20app.jpg)
## How do I get set up? ##

* **Server ("Cnct")**
     * For the Server I have used node.js and specifically express for handling Routing
    * For communication with the db I have used waterline sails.js ORM
     * To make easier debugging I have used the in memory db storage (as you can see in cnct/config/config.js). 
     However it application is ready for using postgres db if needed.
     * For sending notifications I have chosen emails notifications and I have created a dump gmail account for this purpose.

* **UI** 
     * For the UI part I have used ionic framework version 2 which uses angular 
     I had never worked before with ionic so I thought it as a good exercise :-)

**Summary of set up**


1.  We need 2 terminals. 
1.  Change directory to cnct and cnct-ui folder respectively. 
1.  npm install in both applications

```
#!code

npm install
```

### For the server ('cnct') ### 

```
#!js

npm start
```

  
###  For the UI (cnct-ui) ### 

```
#!js

ionic serve
```

or if we want to check        
the UI in different mobile OSs
 

```
#!js

ionic serve --lab
```
 
 
## Database configuration ##
Database is recreated every time server restarts (as it is stored in memory)
## How to run tests ##

```
#!js

npm test
```