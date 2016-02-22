<?php
session_start();
?>

<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="apple-touch-icon" href="../apple-touch-icon.png">
        <!-- Place favicon.ico in the root directory -->
        <link rel="icon" type="/image/png" href="../favicon.ico">

        <!--Import materialize.css-->
        <link type="text/css" rel="stylesheet" href="../css/materialize.min.css"  media="screen,projection"/>

        <link rel="stylesheet" href="../css/normalize.css">
        <link rel="stylesheet" href="../css/main.css">
        <script src="../js/vendor/modernizr-2.8.3.min.js"></script>
    </head>
    <body class="yellow lighten-1">
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <audio autoplay="true" loop="true"><source src="../sounds/bg_main.mp3" type="audio/mpeg" /></audio>

        <div class="container" id="mainMenu_container">
            <div class="row">
                <h1 id="greeting">HELLO, <span id="user"></span>!</h1>
            </div>
            <div class="row" id="buttonMenu">
                <div class="col s3 center-align">
                    <a href="topics.html" class="hoverable waves-effect">
                        <img src="../img/main_lessons.png">
                    </a>
                </div>
                <div class="col s3 center-align">
                    <a href="quizzes/index.html" class="hoverable waves-effect">
                        <img src="../img/main_quiz.png">
                    </a>
                </div>
                <div class="col s3 center-align">
                    <a href="#about_modal" class="hoverable waves-effect modal-trigger">
                        <img src="../img/main_about.png">
                    </a>
                </div>
                <div class="col s3 center-align">
                    <a href="#help_modal" class="hoverable waves-effect modal-trigger">
                        <img src="../img/main_help.png">
                    </a>
                </div>
            </div>

            <div class="row">
                <div class="col s4 btn-container">
                    <a href="#records_modal" class="btn-large hoverable waves-effect modal-trigger">Records</a>
                </div>
                <div class="col s4 btn-container">
                    <a target="_blank" href="http://www.hoodamath.com/mobile/games/flappyfactors.html" class="btn-large hoverable waves-effect modal-trigger">Games</a>
                </div>
                <div class="col s4 btn-container">
                    <a href="../index.php" class="btn-large hoverable waves-effect waves-light orange darken-2 modal-trigger">Sign out</a>
                </div>
                
            </div>

            <div id="about_modal" class="modal">
                <div class="modal-content">
                    <h4>About</h4>
                    <div class="divider"></div>
                    <div class="row">
                        <div class="col s7">
                            <p>Learning Math for Grade 4<br>
                            &copy; 2015-2016 Bulacan State University<br>
                            All rights reserved</p>
                        </div>
                        <img src="../img/logo.png" class="col s5">
                    </div>
                    
                    <p>Developed by: </p>
                    <p>Charibel Camana Esguerra</p>
                    <p>Hazel Joy San Miguel Bernardo</p>
                    <p>Jerolene Tolentino Campillanes</p>
                    <p>Marimar Andrion Cruz</p>
                    
                    <p>This system is protected by copyright and is proprietary to Bulacan State University. Any copying, modification, distribution or public display of this system without written consent of Bulacan State University is strictly prohibited.</p>
                    <br>

                </div>
                <div class="modal-footer">
                <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">OK</a>
                </div>
            </div>

            <div id="help_modal" class="modal">
                <div class="modal-content">
                    <h4>Help</h4>
                    <div class="divider"></div>
                    <dl>
                        <dt>LESSONS</dt>

                        <dd>Pick a topic
                            <img src="../img/help_1.png"> 
                            Then pick a lesson.
                            <img src="../img/help_2.png">
                            Practice what you've learned with our interactive lessons!
                        </dd>
                        <dt>QUIZZES</dt>
                        <dd>Once you've practiced enough, you may take quizzes. 
                            <img src="../img/help_3.png">
                            Overcome the challenge of our interactive quizzes!
                        </dd>
                        <dt>ABOUT</dt>
                        <dd>If you want to know information regarding the development of this system, its owner and use, this is where you can find that</dd>
                    </dl>
                </div>
                <div class="modal-footer">
                <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Ok</a>
                </div>
            </div>

            <div id="records_modal" class="modal">
                <div class="modal-content">
                    <?php
                    echo '<h4>Scores for ' . $_SESSION['name'] . '</h4>'; 
                    echo '<div class="divider"></div>';
                    
                    echo "<table class='striped' id='scores'>";
                    echo "<thead><tr><th>Chapter</th><th class='center-align'>Score</th><th class='center-align'>Items</th></tr></thead>";

                    $servername = "localhost";
                    $username = "root";
                    $password = "";
                    $db_name = "grade4_db";
                    $table_name = "students";
                    $id = $_SESSION['id'];

                    try {
                        $conn = new PDO("mysql:host=$servername;dbname=$db_name", $username, $password);
                        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $stmt = $conn->prepare("SELECT * FROM $table_name WHERE id='$id'"); 
                        $stmt->execute();
                        
                        $result = $stmt->fetch(); 
                        echo '<tbody>';
                        echo '<tr><td>Chapter 1: Whole Numbers</td><td class="center-align">' . $result[3] . '</td>';
                        echo '<td class="center-align">27</td></tr>';
                        echo '<tr><td>Chapter 2: Multiplication & Division</td><td class="center-align">' . $result[4] . '</td>';
                        echo '<td class="center-align">47</td></tr>';
                        echo '<tr><td>Chapter 3: Number Theory and Fraction</td><td class="center-align">' . $result[5] . '</td>';
                        echo '<td class="center-align">24</td></tr>';
                        echo '<tr><td>Chapter 4: Geometry</td><td class="center-align">' . $result[6] . '</td>';
                        echo '<td class="center-align">28</td></tr>';
                        echo '<tr><td>Chapter 5: Pattern and Algebra</td><td class="center-align">' . $result[7] . '</td>';
                        echo '<td class="center-align">15</td></tr>';
                        echo '<tr><td>Chapter 6: Measurement</td><td class="center-align">' . $result[8] . '</td>';
                        echo '<td class="center-align">9</td></tr>';
                        echo '</tbody>';

                    }
                    catch(PDOException $e) {
                        echo "Error: " . $e->getMessage();
                    }
                    $conn = null;
                    echo "</table>";
                    ?>
                </div>
                <div class="modal-footer">
                <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">OK</a>
                </div>
            </div>
        </div>
        

        <script src="../js/vendor/jquery-1.12.0.min.js"></script>
        <script src="../js/plugins.js"></script>
        <script src="../js/main.js"></script>

        <!--Import jQuery before materialize.js-->
        <script type="text/javascript" src="../js/vendor/jquery-2.1.1.min.js"></script>
        <script type="text/javascript" src="../js/materialize.min.js"></script>

    </body>
</html>
