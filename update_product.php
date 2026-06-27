<?php

include "db.php";

$id = $_POST['id'];
$name = $_POST['name'];
$qty = $_POST['qty'];
$price = $_POST['price'];

$sql = "UPDATE products
        SET product_name='$name',
            quantity='$qty',
            price='$price'
        WHERE id='$id'";

if($conn->query($sql)){
    echo "success";
}else{
    echo $conn->error;
}

?>