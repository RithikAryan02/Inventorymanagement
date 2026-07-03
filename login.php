<?php
session_start();
include "db.php";

$email = $_POST['email'];
$password = md5($_POST['password']);

$sql = "SELECT * FROM users
        WHERE email='$email'
        AND password='$password'";
$result = $conn->query($sql);

if($result->num_rows > 0){
    $_SESSION['user'] = $email;
    echo "success";
}
else{
    echo "failed";
}
?>
