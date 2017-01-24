<?php
$name=$_REQUEST['name'];
$email=$_REQUEST['email'];
$message=$_REQUEST['message'];
$subject=$_REQUEST['subject'];
$from="From: $name<$email>\r\nReturn-path: $email";
mail("me@josedelavalle.com", $subject, $message, $from);
?>