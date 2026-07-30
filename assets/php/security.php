<?php
/**
 * Tajweedi Academy — Security Helpers
 */

session_start();

class Security {
    /**
     * Generate CSRF Token
     */
    public static function generateCSRF() {
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }

    /**
     * Verify CSRF Token
     */
    public static function verifyCSRF($token) {
        return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
    }

    /**
     * Rate Limiting (Simple File-Based)
     */
    public static function checkRateLimit() {
        $ip = $_SERVER['REMOTE_ADDR'];
        $limitFile = DATA_PATH . '/rate_limits.json';

        $limits = file_exists($limitFile) ? json_decode(file_get_contents($limitFile), true) : [];

        $now = time();
        if (isset($limits[$ip])) {
            // Cleanup old entries
            $limits[$ip] = array_filter($limits[$ip], function($timestamp) use ($now) {
                return ($now - $timestamp) < RATE_LIMIT_TIME;
            });

            if (count($limits[$ip]) >= RATE_LIMIT_COUNT) {
                return false;
            }
        } else {
            $limits[$ip] = [];
        }

        $limits[$ip][] = $now;
        file_put_contents($limitFile, json_encode($limits));
        return true;
    }

    /**
     * Sanitize Output
     */
    public static function escape($data) {
        return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    }
}
