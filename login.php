<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$db_name = "grade4_db";
$table_name = "students";
$name = $_POST['studname'];
$passphrase = $_POST['password'];
$url_success = 'pages/main_menu.php';
$url_fail = 'index.php';

try {
    $conn = new PDO("mysql:host=$servername;dbname=$db_name", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT id, name, password FROM $table_name WHERE name = '$name'"); 
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
    	# code...
    	echo $name . ' exists';
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result['password'] == $passphrase) {
            $_SESSION['id'] = $result['id'];
            $_SESSION['name'] = $name;
            $_SESSION['notification'] = null;
            header("Location: $url_success");
        } else {
            $_SESSION['notification'] = 'The password you used was wrong.';
            $_SESSION['notificationType'] = 'fail';
            header("Location: $url_fail");
        }
    } 
    echo "Connected successfully"; 
    }
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }
?>
