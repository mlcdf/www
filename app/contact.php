<?php

    $to = "maxime.lcdf@gmail.com";
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = "Contact website";
    $message = $_POST['message'];

    $headers ='From: contact@maximelecontedesfloris.com'."\n";
    $headers .='Reply-To: contact@maximelecontedesfloris.com'."\n";
    $headers .='Content-Type: text/plain; charset="iso-8859-1"'."\n";
    $headers .='Content-Transfer-Encoding: 8bit';

    $body = "De: $name\nE-Mail: $email\nMessage:\n $message";

    mail($to, $subject, $body, $headers);


?>
