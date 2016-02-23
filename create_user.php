<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$db_name = "grade4_db";
$table_name = "students";
$name = $_POST['create_username'];
$passphrase = $_POST['create_password'];
$url = 'index.php';

try {
    $conn = new PDO("mysql:host=$servername;dbname=$db_name", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("INSERT into $table_name (name, password, ch1, ch2, ch3, ch4, ch5, ch6) VALUES ('$name', '$passphrase', '0', '0', '0', '0', '0', '0')"); 

    if ($stmt->execute()) {
    	# code...
        $_SESSION['notification'] = 'Your account has been successfully created.';
        $_SESSION['notificationType'] = 'success';
        header("Location: $url");
    } 
}
catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
	$_SESSION['notification'] = 'That username already exists.';
	$_SESSION['notificationType'] = 'fail';
	header("Location: $url");
}
?>
