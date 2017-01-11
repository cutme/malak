<?php

if(empty($_POST['name'])) {
	die('Error: Missing variables');
}

$name		= $_POST['name'];
$email		= $_POST['email'];
$message	= $_POST['message'];

$to = 'info@cutme.pl';

$headers = 'From: '.$name.' <'.$email.'>'."\r\n" .
	'Reply-To: '.$email."\r\n" .
	'X-Mailer: PHP/' . phpversion();
$subject = 'kontakt ze strony';
$body.='Imię: '.$name."\n";
$body.='E-mail: '.$email."\n";


if (!empty($message)) {
	$body.='Wiadomość: '.$message."\n";
}

if(mail($to, $subject, $body, $headers)) {
	die('ok');
} else {
	die('Error: Mail failed');
}

?>
