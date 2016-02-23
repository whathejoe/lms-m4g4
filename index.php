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

        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <!-- Place favicon.ico in the root directory -->
        <link rel="icon" type="image/png" href="favicon.ico">

        <!--Import materialize.css-->
        <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.8.3.min.js"></script>
    </head>
    <body class="yellow lighten-1">
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <audio autoplay="true" loop="true"><source src="sounds/bg_login.mp3" type="audio/mpeg" /></audio>
        <div class="container">
            <div class="row center-align">
                <img src="img/splash.gif" id="appLogo" class="center-align">    
            </div>

            <form id="loginForm" name="login" method="post" action="login.php">
                <div class="row">
                    <div class="btn-container col s4">
                        <a href="#select_user_modal" class="btn-large modal-trigger">Load existing user</a>
                    </div>
                    <div class="input-field col s4">
                        <input name="studname" id="name" type="text" class="validate" readonly required placeholder="Select user">
                    </div>
                    <div class="input-field col s4">
                        <input name="password" id="password" type="password" class="validate" required placeholder="Password">
                    </div>
                </div>
                <div class="row">
                    <div class="btn-container col s4">
                        <a href="#create_user_modal" class="btn-large modal-trigger">Create User</a>
                    </div>
                    <div class="btn-container col s8">
                        <button type="submit" class="waves-effect waves-light btn-large amber darken-4" id="start">Start</button>
                    </div>
                </div>
            </form>
        </div>

        <footer>
            <img src="img/splash_footer.png">
        </footer>

        <div id="select_user_modal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4>Select your username</h4>

                <div class="divider"></div>
                
                <?php
                $servername = "localhost";
                $username = "root";
                $password = "";
                $db_name = "grade4_db";
                $table_name = "students";

                try {
                    $conn = new PDO("mysql:host=$servername;dbname=$db_name", $username, $password);
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $stmt = $conn->prepare("SELECT id, name FROM $table_name"); 
                    $stmt->execute();

                    $result = $stmt->fetchAll(); 
                    foreach($result as $r) { 
                        echo '<p><input class="with-gap" name="users" type="radio" id="' . $r[0] . '"  />
                                <label for="' . $r[0] . '">' . $r[1] . '</label></p>';
                    }
                }
                catch(PDOException $e) {
                    echo "Error: " . $e->getMessage();
                }
                $conn = null;
                ?>
                
            </div>
            <div class="modal-footer">
                <a id="select_user_submit" class="modal-action modal-close waves-effect waves-green btn-flat">OK</a>
            </div>
            </form>
        </div>

        <div id="create_user_modal" class="modal">
            <div class="modal-content">
                <h4>Create new user</h4>
                
                <form id="createUser" name="create_user" method="post" action="create_user.php">
                    <div class="row">
                        <div class="input-field col s6 push-s3">
                            <input name="create_username" id="create_username" type="text" class="validate" maxlength="20" pattern=".{5,}" required>
                            <label for="create_username">Username</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6 push-s3">
                            <input name="create_password" id="create_password" type="password" class="validate" maxlength="20" required>
                            <label for="create_password">Password</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6 push-s3">
                            <input name="create_password_repeat" id="create_password_repeat" type="password" class="validate" maxlength="20" required>
                            <label for="create_password_repeat">Repeat password</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s3 push-s3">
                            <button type="submit" class="waves-effect waves-light btn amber darken-4" id="create">Create</button>
                        </div>
                        <div class="input-field col s3 push-s3">
                            <a id="new_user_submit" class="modal-action modal-close waves-effect waves-green btn">Cancel</a>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>

        <script src="js/vendor/jquery-1.12.0.min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>

        <!--Import jQuery before materialize.js-->
        <script type="text/javascript" src="js/vendor/jquery-2.1.1.min.js"></script>
        <script type="text/javascript" src="js/materialize.min.js"></script>

        <script type="text/javascript">
            $('form[name=login]').submit(function () {

                // Get the Login Name value and trim it
                var name = $.trim($('#name').val());

                // Check if empty or not
                if (name  === '') {
                    alert('Please select a valid username.');
                    return false;
                } else {
                    load("login.php");
                }
            });

            $('#select_user_submit').on('click', function () {

                // Get the Login Name value and trim it
                var user = $('input[name=users]:checked + label').text();
                console.log(user);

                // Check if empty or not
                $('#name').val(user);
            });
        </script>
        
        <?php 
        if (isset($_SESSION['notification']) && isset($_SESSION['notificationType'])) {
            # code...
            if ($_SESSION['notificationType'] == 'success') {
                # code...
                echo '<script type="text/javascript">'
                    , 'var $toastContent = $("<span>' . $_SESSION['notification'] . '</span>");'
                    , 'Materialize.toast($toastContent, 10000, "rounded notif-success");'
                    , '</script>'
                ;
            } else if ($_SESSION['notificationType'] == 'fail') {
                echo '<script type="text/javascript">'
                    , 'var $toastContent = $("<span>' . $_SESSION['notification'] . '</span>");'
                    , 'Materialize.toast($toastContent, 10000, "rounded notif-fail");'
                    , '</script>'
                ;

            }

        }
        ?>

    </body>
</html>
