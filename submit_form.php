<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    // Set the recipient email address
    $to = "ditsanstas@gmail.com";

    // Set the email subject
    $subject = "New Feedback Submission";

    // Build the email content
    $body = "Name: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Phone: " . $phone . "\n";
    $body .= "Message: " . $message . "\n";

    // Set additional headers
    $headers = "From: " . $name . " <" . $email . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";

    // Attempt to send the email
    if (mail($to, $subject, $body, $headers)) {
        // Email sent successfully
        echo json_encode(array("status" => "success"));
    } else {
        // Error sending email
        echo json_encode(array("status" => "error"));
    }
}
?>
