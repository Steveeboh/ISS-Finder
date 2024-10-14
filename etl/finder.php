<?php
// Set headers to allow cross-origin requests from any domain
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// The URL of the ISS API
$issApiUrl = "http://api.open-notify.org/iss-now.json";

// Fetch the API data using cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $issApiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute the request
$response = curl_exec($ch);

// Check for errors
if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => "Unable to retrieve data from the ISS API."]);
    exit();
}

// Close the cURL session
curl_close($ch);

// Return the response to the client
echo $response;
