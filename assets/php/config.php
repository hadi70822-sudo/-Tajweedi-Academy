<?php
/**
 * Tajweedi Academy — Configuration
 */

// Error reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Path definitions
define('ROOT_PATH', dirname(__DIR__, 2));
define('DATA_PATH', ROOT_PATH . '/data');
define('LOG_FILE', DATA_PATH . '/messages.json');

// Site settings
define('SITE_NAME', 'Tajweedi Quran Academy');
define('ADMIN_EMAIL', 'hafizwaleed619@gmail.com');

// Rate limiting settings
define('RATE_LIMIT_TIME', 3600); // 1 hour
define('RATE_LIMIT_COUNT', 5);    // 5 messages per hour per IP

// Ensure data directory exists
if (!is_dir(DATA_PATH)) {
    mkdir(DATA_PATH, 0755, true);
}

// Ensure messages.json exists and is valid JSON
if (!file_exists(LOG_FILE)) {
    file_put_contents(LOG_FILE, json_encode([]));
}
