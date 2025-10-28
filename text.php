<?php
$host = 'localhost';
$dbname = 'comments';   // Correct database name
$username = 'root';
$password = 'Inna1998';                 // Or your MySQL password
$port = 3307;                   // Default MySQL port

// Create connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;port=$port", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully!";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
