<?php
// Test contact form - for local testing
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Only POST allowed
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get input
$input = json_decode(file_get_contents('php://input'), true);

// Log for debugging
error_log("Contact form received: " . print_r($input, true));

// Validate
if (!$input || !isset($input['name']) || !isset($input['email']) || !isset($input['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// Sanitize
$name = htmlspecialchars(trim($input['name']));
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$subject = isset($input['subject']) ? htmlspecialchars(trim($input['subject'])) : 'Contact Form Submission';
$message = htmlspecialchars(trim($input['message']));
$type = isset($input['type']) ? htmlspecialchars(trim($input['type'])) : 'general';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email']);
    exit;
}

// For testing, just return success without sending email
echo json_encode([
    'success' => true, 
    'message' => 'Test message received successfully',
    'debug' => [
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'type' => $type
    ]
]);
?>
