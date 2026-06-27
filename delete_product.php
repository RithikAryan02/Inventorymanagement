<?php
include "db.php";

$id = (int)$_POST['id'];

$sql = "DELETE FROM products WHERE id=$id";

if($conn->query($sql)){
    echo "success";
}else{
    echo $conn->error;
}
?>