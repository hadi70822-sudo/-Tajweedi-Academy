<?php
/**
 * Tajweedi Academy — Validation Helper
 */

class Validator {
    /**
     * Validate Contact Form Input
     */
    public static function validateContact($input) {
        $errors = [];

        // Name: required, 2-80 chars
        if (empty($input['name']) || strlen($input['name']) < 2 || strlen($input['name']) > 80) {
            $errors[] = "Please enter a valid name (2-80 characters).";
        }

        // Email: required, valid format
        if (empty($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Please enter a valid email address.";
        }

        // Phone: required, basic pattern
        if (empty($input['phone']) || !preg_match("/^[0-9+\-\s()]{7,20}$/", $input['phone'])) {
            $errors[] = "Please enter a valid phone number.";
        }

        // Message: required, 10-1000 chars
        if (empty($input['message']) || strlen($input['message']) < 10 || strlen($input['message']) > 1000) {
            $errors[] = "Message must be between 10 and 1000 characters.";
        }

        return $errors;
    }

    /**
     * Basic Sanitization
     */
    public static function sanitize($input) {
        return array_map(function($value) {
            return trim(strip_tags($value));
        }, $input);
    }
}
