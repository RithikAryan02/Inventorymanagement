<?php
session_start();

if(!isset($_SESSION['user'])){
    header("Location: login.html");
    exit();
}
?>
<script>
window.location = "index.html";
</script>