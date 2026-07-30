<?php
/**
 * Tajweedi Academy — Data Logger (JSON)
 */

class Logger {
    /**
     * Save message to JSON with file locking
     */
    public static function saveMessage($data) {
        $file = LOG_FILE;

        // Open file for reading and writing
        $fp = fopen($file, 'r+');
        if (!$fp) return false;

        // Acquire exclusive lock
        if (flock($fp, LOCK_EX)) {
            $content = stream_get_contents($fp);
            $messages = json_decode($content, true);
            if (!is_array($messages)) $messages = [];

            // Add new message with timestamp and metadata
            $data['id'] = uniqid('msg_', true);
            $data['timestamp'] = date('Y-m-d H:i:s');
            $data['ip'] = $_SERVER['REMOTE_ADDR'];
            $data['user_agent'] = $_SERVER['HTTP_USER_AGENT'];

            $messages[] = $data;

            // Clear file and write new content
            ftruncate($fp, 0);
            rewind($fp);
            fwrite($fp, json_encode($messages, JSON_PRETTY_PRINT));

            // Release lock
            flock($fp, LOCK_UN);
            fclose($fp);
            return true;
        } else {
            fclose($fp);
            return false;
        }
    }
}
