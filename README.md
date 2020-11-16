# REALTIME TODO LIST 


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

* [Angular](https://angular.io/) - 
* [NPM](https://www.npmjs.com/) - Most of the modules are used
* [nodemailer](https://nodemailer.com/about/) - NPM module to send the mails
* [apiDoc](http://apidocjs.com/) - NPM module to create the apiDoc and eventDoc


## DEVELOPMENT DETAILS

* **ABDUL RAHUMAN** - *DEVELOPER* - [ABDUL RAHUMAN](https://github.com/Abdull8870)
* **Edwisor** - *DESIGN DOCUMENT* - [Edwisor](https://www.edwisor.com)
