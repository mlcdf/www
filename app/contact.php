<?php

if ($_POST["submit"]) {
{
    $to = "maxime.lcdf@gmail.com";
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $body = "De: $name\n E-Mail: $email\n Message:\n $message";

    mail($to, $body);


    header('Location: index.html');
    echo "ça marche";

}
?>
