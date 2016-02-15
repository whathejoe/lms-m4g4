<?php
$servername = "localhost";
$username = "root";
$password = "";
$db_name = "grade4_db";
$table_name = "students";
$name = $_POST['studname'];
$url = 'pages/main_menu.html';

try {
    $conn = new PDO("mysql:host=$servername;dbname=$db_name", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT id, name FROM $table_name WHERE name = '$name'"); 
    $stmt->execute();

    $result = $stmt->rowCount(); 
    if ($result > 0) {
    	# code...
    	echo $name . ' exists';
        header("Location: $url");
    }
    echo "Connected successfully"; 
    }
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }
?>
