<?php
if ($_POST) {
    $to = 'mikail.syahdina@gmail.com';
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    mail($to, $subject, $message, $headers);
    echo json_encode(['status' => 'success']);
}
?>