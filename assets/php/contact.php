<?php
/**
 * Tajweedi Academy — Contact Form Handler (AJAX)
 */

require_once 'config.php';
require_once 'security.php';
require_once 'validator.php';
require_once 'logger.php';

header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Honeypot check (to be added in HTML)
if (!empty($_POST['website_url'])) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully (spam filtered).']);
    exit;
}

// Rate limit check
if (!Security::checkRateLimit()) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Too many requests. Please try again later.']);
    exit;
}

// Sanitize inputs
$rawInput = $_POST;
$sanitizedInput = Validator::sanitize($rawInput);

// Validate inputs
$errors = Validator::validateContact($sanitizedInput);

if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// Save to JSON
if (Logger::saveMessage($sanitizedInput)) {
    echo json_encode(['success' => true, 'message' => 'Jazak Allah Khair! Your message has been received. We will contact you soon.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error: Could not save message.']);
}
