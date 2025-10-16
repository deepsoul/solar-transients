<?php
// CORS-Header für Cross-Domain-Requests
$allowedOrigins = [
    'https://solar-transients.vercel.app',
    'https://solar-transients.de',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
    'http://127.0.0.1:3003',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://127.0.0.1:5175',
    'http://127.0.0.1:5176',
    'http://127.0.0.1:5177'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header('Access-Control-Allow-Origin: *');
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Check if JSON was parsed successfully
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit;
}

// Validate required fields
$required_fields = ['name', 'email', 'subject', 'message', 'type'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
        exit;
    }
}

// Sanitize input
$name = htmlspecialchars(trim($input['name']));
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars(trim($input['subject']));
$message = htmlspecialchars(trim($input['message']));
$type = htmlspecialchars(trim($input['type']));

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Email configuration
$to_artist = 'hello@solar-transients.com';
$to_booking = 'booking@solar-transients.com';

// Determine recipient based on inquiry type
$recipient = $to_artist;
switch ($type) {
    case 'booking':
        $recipient = $to_booking;
        break;
    case 'collaboration':
    case 'general':
    default:
        $recipient = $to_artist;
        break;
}

// Create email subject
$email_subject = "[SOLAR TRANSIENTS] " . ucfirst($type) . ": " . $subject;

// Generate HTML email
$html_email = generateHTMLEmail($name, $email, $subject, $message, $type);

// Email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: SOLAR TRANSIENTS Contact Form <noreply@solar-transients.de>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
];

// Send email
$mail_sent = mail($recipient, $email_subject, $html_email, implode("\r\n", $headers));

if ($mail_sent) {
    // Send confirmation email to sender
    $confirmation_subject = "Thank you for contacting SOLAR TRANSIENTS";
    $confirmation_html = generateConfirmationEmail($name, $type);
    
    $confirmation_headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: SOLAR TRANSIENTS <noreply@borishorn.de>',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    mail($email, $confirmation_subject, $confirmation_html, implode("\r\n", $confirmation_headers));
    
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send message']);
}

function generateHTMLEmail($name, $email, $subject, $message, $type) {
    $timestamp = date('Y-m-d H:i:s');
    $type_labels = [
        'general' => 'General Inquiry',
        'booking' => 'Booking Request',
        'collaboration' => 'Collaboration'
    ];
    
    return "
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>New Contact Form Submission</title>
        <style>
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #1a1a1a;
                background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            .header {
                background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
                padding: 30px;
                text-align: center;
                color: white;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            .header p {
                margin: 10px 0 0 0;
                opacity: 0.9;
                font-size: 16px;
            }
            .content {
                padding: 30px;
            }
            .field {
                margin-bottom: 20px;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
                border-left: 4px solid #ff6b35;
            }
            .field-label {
                font-weight: 600;
                color: #ff6b35;
                margin-bottom: 5px;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .field-value {
                color: #333;
                font-size: 16px;
            }
            .message-field {
                background: #f0f0f0;
                padding: 20px;
                border-radius: 8px;
                white-space: pre-wrap;
                font-family: 'Courier New', monospace;
                border: 1px solid #e0e0e0;
            }
            .footer {
                background: #2c2c2c;
                color: #ffffff;
                padding: 20px 30px;
                text-align: center;
                font-size: 14px;
            }
            .footer a {
                color: #ff6b35;
                text-decoration: none;
            }
            .type-badge {
                display: inline-block;
                background: #ff6b35;
                color: white;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .timestamp {
                color: #666;
                font-size: 12px;
                margin-top: 20px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🌟 SOLAR TRANSIENTS</h1>
                <p>New Contact Form Submission</p>
            </div>
            
            <div class='content'>
                <div class='field'>
                    <div class='field-label'>Inquiry Type</div>
                    <div class='field-value'>
                        <span class='type-badge'>" . $type_labels[$type] . "</span>
                    </div>
                </div>
                
                <div class='field'>
                    <div class='field-label'>Name</div>
                    <div class='field-value'>" . $name . "</div>
                </div>
                
                <div class='field'>
                    <div class='field-label'>Email</div>
                    <div class='field-value'>
                        <a href='mailto:" . $email . "' style='color: #ff6b35; text-decoration: none;'>" . $email . "</a>
                    </div>
                </div>
                
                <div class='field'>
                    <div class='field-label'>Subject</div>
                    <div class='field-value'>" . $subject . "</div>
                </div>
                
                <div class='field'>
                    <div class='field-label'>Message</div>
                    <div class='message-field'>" . $message . "</div>
                </div>
                
                <div class='timestamp'>
                    Received on " . $timestamp . " UTC
                </div>
            </div>
            
            <div class='footer'>
                <p>This message was sent via the SOLAR TRANSIENTS contact form</p>
                <p>Website: <a href='https://solar-transients.de'>solar-transients.de</a></p>
            </div>
        </div>
    </body>
    </html>";
}

function generateConfirmationEmail($name, $type) {
    $type_messages = [
        'general' => 'We\'ll get back to you as soon as possible!',
        'booking' => 'We\'ll review your booking request and get back to you within 24 hours.',
        'collaboration' => 'We\'re excited about potential collaborations! We\'ll be in touch soon.'
    ];
    
    return "
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Thank you for contacting SOLAR TRANSIENTS</title>
        <style>
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #1a1a1a;
                background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            .header {
                background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
                padding: 40px 30px;
                text-align: center;
                color: white;
            }
            .header h1 {
                margin: 0;
                font-size: 32px;
                font-weight: 700;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            .header p {
                margin: 15px 0 0 0;
                opacity: 0.9;
                font-size: 18px;
            }
            .content {
                padding: 40px 30px;
                text-align: center;
            }
            .content h2 {
                color: #ff6b35;
                margin-bottom: 20px;
                font-size: 24px;
            }
            .content p {
                color: #666;
                font-size: 16px;
                margin-bottom: 20px;
                line-height: 1.8;
            }
            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 25px;
                font-weight: 600;
                margin: 20px 0;
                transition: transform 0.3s ease;
            }
            .cta-button:hover {
                transform: translateY(-2px);
            }
            .social-links {
                margin-top: 30px;
                padding-top: 30px;
                border-top: 1px solid #eee;
            }
            .social-links a {
                display: inline-block;
                margin: 0 10px;
                color: #ff6b35;
                text-decoration: none;
                font-weight: 600;
            }
            .footer {
                background: #2c2c2c;
                color: #ffffff;
                padding: 20px 30px;
                text-align: center;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🌟 SOLAR TRANSIENTS</h1>
                <p>Thank you for reaching out!</p>
            </div>
            
            <div class='content'>
                <h2>Hello " . $name . "!</h2>
                <p>Thank you for your message. " . $type_messages[$type] . "</p>
                
                <p>In the meantime, feel free to explore our music and follow us on social media for the latest updates.</p>
                
                <a href='https://solar-transients.de' class='cta-button'>Visit Our Website</a>
                
                <div class='social-links'>
                    <a href='https://instagram.com/solar_transients'>Instagram</a>
                    <a href='https://twitter.com/solar_transients'>Twitter</a>
                    <a href='https://open.spotify.com/artist/solar-transients'>Spotify</a>
                </div>
            </div>
            
            <div class='footer'>
                <p>SOLAR TRANSIENTS - Electronic Music Artist</p>
                <p>Website: <a href='https://solar-transients.de' style='color: #ff6b35;'>solar-transients.de</a></p>
            </div>
        </div>
    </body>
    </html>";
}
?>
