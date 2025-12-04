<?php
/**
 * Plugin Name: Headless Redirects API
 * Description: Exposes Redirection plugin data via REST API for headless WordPress setups
 * Version: 1.0.0
 * Author: Headless WordPress Boilerplate
 * 
 * INSTALLATION:
 * 1. Copy this file to your WordPress wp-content/mu-plugins/ folder
 * 2. If mu-plugins folder doesn't exist, create it
 * 3. The plugin will auto-activate
 * 
 * USAGE:
 * GET /wp-json/headless/v1/redirects
 * Returns all enabled redirects from the Redirection plugin by John Godley
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', function () {
    register_rest_route('headless/v1', '/redirects', [
        'methods' => 'GET',
        'callback' => 'headless_get_redirects',
        'permission_callback' => '__return_true',
    ]);
});

/**
 * Get all enabled redirects from Redirection plugin
 */
function headless_get_redirects() {
    global $wpdb;
    
    // Redirection plugin table name
    $table_name = $wpdb->prefix . 'redirection_items';
    
    // Check if table exists
    if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") !== $table_name) {
        return new WP_REST_Response([
            'error' => 'Redirection plugin table not found',
            'message' => 'Please install and activate the Redirection plugin by John Godley'
        ], 404);
    }
    
    // Get all enabled redirects (status = 'enabled')
    $redirects = $wpdb->get_results(
        "SELECT id, url, action_data, action_code, status 
         FROM {$table_name} 
         WHERE status = 'enabled' 
         AND action_type = 'url'",
        ARRAY_A
    );
    
    if ($redirects === null) {
        return new WP_REST_Response([
            'error' => 'Database query failed',
            'message' => $wpdb->last_error
        ], 500);
    }
    
    // Transform to match expected format
    $result = array_map(function($r) {
        return [
            'id' => (int)$r['id'],
            'url' => $r['url'],
            'action_data' => json_decode($r['action_data'], true),
            'action_code' => (int)$r['action_code'],
            'enabled' => $r['status'] === 'enabled'
        ];
    }, $redirects);
    
    return new WP_REST_Response(['items' => $result], 200);
}
