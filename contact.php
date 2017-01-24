<?php
if($_POST)
{
    $to_email       = "me@josedelavalle.com"; //Recipient email, Replace with own email here
    
    // //check if its an ajax request, exit if not
    // if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        
    //     $output = json_encode(array( //create JSON data
    //         'type'=>'error', 
    //         'text' => 'Sorry Request must be Ajax POST'
    //     ));
    //     die($output); //exit script outputting json data
    // } 
    
    //Sanitize input data using PHP filter_var().
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $user_name = $request->name;
    $user_email = $request->email;
    $message = $request->msg;
   

    //$user_name      = $_POST["name"];
    //$user_email     = $_POST["email"];
    $subject        = "Website Contact Form";
    //$message        = $_POST["msg"];
    
    
    
    //email body
    $message_body = $message."\r\n\r\n-".$user_name."\r\nEmail : ".$user_email;
    
    //proceed with PHP email.
    $headers = 'From: '.$user_name.'' . "\r\n" .
    'Reply-To: '.$user_email.'' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    
    $send_mail = mail($to_email, $subject, $message_body, $headers);
    
    if(!$send_mail)
    {
        //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
        $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
        die($output);
    }else{
        $output = json_encode(array('type'=>'message', 'text' => 'Hi '.$user_name .' Thank you for your email'));
        die($output);
    }
}
?>