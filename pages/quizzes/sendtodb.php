<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$db_name = "grade4_db";
$table_name = "students";
$id = $_SESSION['id'];
$name = $_SESSION['name'];
$column = $_POST['chapter'];
$score = $_POST['score'];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$db_name", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("UPDATE $table_name SET $column='$score' WHERE id=$id"); 
    $stmt->execute();
}
catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>