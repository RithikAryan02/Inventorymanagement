<?php

$conn = new mysqli(
    "localhost",
    "root",
    "",
    "inventory.db"
);

if ($conn->connect_error) {
    die("Connection Failed: " . $conn->connect_error);
}

?>