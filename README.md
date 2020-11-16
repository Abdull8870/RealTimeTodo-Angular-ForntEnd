# REALTIME TODO LIST 

* [RealTimeTodoList WebSite](http://realtime-todo-list.s3-website-ap-southeast-1.amazonaws.com/) - Hosted the Application in AWS

## About the Application

This project is aimed to create a ready to deploy Live TODO List management system.
It must have all the features mentioned below and it must be deployed on a server
before submission. There should be two separate parts of the application. A Frontend
developed and deployed using the technologies mentioned below and a REST API (with
realtime functionalities) created using the technologies mentioned below.

Frontend Technologies - HTML5, CSS3, JS, Bootstrap and Angular
Backend Technologies - NodeJS, ExpressJS and Socket.IO
Database - MongoDB and Redis

## How to Use

Run "npm install" inside this project folder to install all dependencies.

Make sure you use the latest version of the CLI (upgrade guide below)

Run "ng serve" to see the app in action (try "npm start" in case "ng serve" fails).

Feel free to compare it with your project code to spot any errors you might have.


How to upgrade the CLI
-----------------------

Run the below commands - only use "sudo" on Mac/ Linux.

sudo npm uninstall -g angular-cli @angular/cli
npm cache clean --force
sudo npm install -g @angular/cli



## Screenshots of Application

### Login Page
![alt loginpage](https://github.com/Abdull8870/RealTimeTodo-Angular-ForntEnd/blob/master/Screenshot/Loginpage.PNG)


### Home Page
![alt HomePage](https://github.com/Abdull8870/RealTimeTodo-Angular-ForntEnd/blob/master/Screenshot/Home.PNG)

### Todo list Page
![alt todolistpage](https://github.com/Abdull8870/RealTimeTodo-Angular-ForntEnd/blob/master/Screenshot/Todo.PNG)

### Friends Section
![alt friendspage](https://github.com/Abdull8870/RealTimeTodo-Angular-ForntEnd/blob/master/Screenshot/friends.PNG)


### Friends
![alt friend](https://github.com/Abdull8870/RealTimeTodo-Angular-ForntEnd/blob/master/Screenshot/friendAccepted.PNG)

### Friend Request Sent
![alt friendRequestSent](https://github.com/Abdull8870/RealTimeTodo-Angular-ForntEnd/blob/master/Screenshot/sendRequest.PNG)


### Friends Request Received
![alt friendRequestReceived](https://github.com/Abdull8870/RealTimeTodo-Angular-ForntEnd/blob/master/Screenshot/friendRequestreceived.PNG)



## DESIGN DOCUMENT

Application is built upon the following requirements


1) User management System -

    a) Signup - User is able to sign up on the platform providing all
details like FirstName, LastName, Email and Mobile number. Country
code for mobile number (like 91 for India) will be automatically selected after selecting the Country.

    b) Login - User is able to login using the credentials provided at signup.

    c) Forgot password - User can recover password using a link on email. 


2) To do list management (single user) -

    a) Once user logs into the system, he see an option to create a ToDo List
    b) User is able to create, a new empty list, by clicking on a create button
    c) User is able to add, delete and edit items to the list
    d) User is able to add sub-todo-items, as child of any item node.
    Such that, complete list will take a tree shape, with items and their
    child items.
    e) User is able to mark an item as "done" or "open".
    f) User is able to see his old ToDo Lists, once logged in.

3) To do List management (multi-user) -

    a) Friends are able to edit, delete, update the list of the user.
    b) On every action, all friends will get notification, in real time, of what specific
    change is done by which friend. Also the list should be in sync with all
    friends, at any time, i.e. all actions should be reflected in real time.
    c) Any friend is able to undo, any number of actions, done in past.
    Each undo action, will remove the last change, done by any user. So,
    history of all actions will be persisted in database , so as, not to
    lose actions done in past.
    d) Undo action will happen by a button on screen, as well as, through
    keyboard commands, which are "ctrl+z" for windows and "cmd+z" for mac.

4) Friend List -

    a) User is able to send friend requests, to the users on the
    system. Once requests are accepted, the friend will be added in user's
    friend list. Friends will be Notified, in real time using notifications.


5) Error Views and messages - Each major error response
(like 404 or 500) are handled by different pages.Like if user try to access the page that is not in the application he/she will get a 'Page Not Found Page'.


## MEAN APPLICATION BUILT WITH

* [Angular](https://angular.io/) - Front End framework
* [NPM](https://www.npmjs.com/) 
* [nodemailer](https://nodemailer.com/about/) - For Sending Mails
* [Nodejs](https://nodejs.org/en/) - Used for Backend 
* [ExpressJs](https://expressjs.com/) - Used for Backend
* [Mongoose](https://mongoosejs.com/) - Database
* [ApiDocumentation](http://expense-splitter-abv2.s3-website.us-east-2.amazonaws.com/) - REST API Documentation


## DEVELOPMENT DETAILS

* **ABDUL RAHUMAN** - *DEVELOPER* - [ABDUL RAHUMAN](https://github.com/Abdull8870)
* **Edwisor** - *DESIGN DOCUMENT* - [Edwisor](https://www.edwisor.com)

