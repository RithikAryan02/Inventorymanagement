<?php

include "db.php";

if($_SERVER["REQUEST_METHOD"] == "POST"){

    echo"<pre>";
    print_r($_POST);
    echo"</pre>";

    $name = $_POST['name'];
    $qty = $_POST['qty'];
    $price = $_POST['price'];
    $category = $_POST['category'];
    
$sql = "INSERT INTO products(product_name, category, quantity, price)
        VALUES('$name', '$category', '$qty', '$price')";
    if($conn->query($sql)){
        echo "success";
    } else {
        echo $conn->error;
    }
}
?>