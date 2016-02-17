# Learning Math for Grade 4

### Summary
Interactive learning system for grade 4 students. Includes lessons with practice sections, randomized quizzes and playful animations.

### Requirements
1. Latest version of Chrome [Download here](https://www.google.com/chrome/browser/desktop/index.html)
2. Wampserver (64 bits & PHP 5.5) 2.5 [Download here (lower right)](http://www.wampserver.com/en/#download-wrapper)

### Instructions

#### Setting up the database
1. Fire up Wamp Server and make sure it is running (should be green on the taskbar)
2. On your browser go to *http://localhost/phpmyadmin/*
3. Click on SQL, enter `CREATE DATABASE grade4_db;` and click Go
4. Click on grade4_db on the database list (left-hand side)
5. Again click on SQL and enter the following code:
    ```sql 
    CREATE TABLE students (
	    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	    name VARCHAR(30) NOT NULL,
	    ch1 INT(3),
	    ch2 INT(3),
	    ch3 INT(3),
	    ch4 INT(3),
	    ch5 NT(3),
	    ch6 INT(3)
    )
    ```
    
#### Creating student profiles
1. Go to *http://localhost/phpmyadmin/*
2. Click on *grade4_db* and select the *students* table
3. Click on the **Insert** tab
4. Fill up the name field and click Go. No need to fill up the other fields

#### Uploading your site to the server
1. Download a copy of the repo and unzip its contents inside *C:\wamp\www*
2. There should now be a folder named lms-m4g4
3. On you browser go to *http://localhost/lms-m4g4/*

### Tech used
1. Languages
  * HTML5
  * CSS3
  * Javascript
  * PHP
  * MySQL
2. Libraries / Frameworks
  * AngularJS
  * Animate.css
  * HTML5 Boilerplate
  * jQuery
  * Materialize
  * Modernizr
  * Normalize
