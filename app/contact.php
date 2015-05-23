<?php


if(!empty($_POST['name']) && !empty($_POST['email']))
{
    $to = "maxime.lcdf@gmail.com";
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = "Contact website";
    $message = $_POST['message'];

    $headers ='From: contact@maximelecontedesfloris.com'."\n";
    $headers .='Reply-To: contact@maximelecontedesfloris.com'."\n";
    $headers .='Content-Type: text/plain; charset="iso-8859-1"'."\n";
    $headers .='Content-Transfer-Encoding: 8bit';

    $body = "De: $name\n E-Mail: $email\n Message:\n $message";

    mail($to, $subject, $body, $headers);

    echo '<script language="javascript">alert("Message successfully sent.")</script>';
    header( "refresh:2;url=http://maximelecontedesfloris.com/" );

}
else
{
  echo '<script language="javascript">alert("Something went wrong. Please try again.")</script>';
  header( "refresh:5;url=http://maximelecontedesfloris.com/" );
}
?>
