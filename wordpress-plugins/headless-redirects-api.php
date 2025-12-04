<?php
/**
 * Plugin Name: Headless Redirects API
 * Description: Exposes EPS 301 Redirects via REST API for headless WordPress setups
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
 * Returns all active redirects from EPS 301 Redirects plugin
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', function () {
    register_rest_route('headless/v1', '/redirects', [
        'methods' => 'GET',
        'callback' => 'headless_get_eps_redirects',
        'permission_callback' => '__return_true', // Public endpoint
    ]);
});

/**
 * Get all active redirects from EPS 301 Redirects plugin
 */
function headless_get_eps_redirects() {
    global $wpdb;
    
    // EPS 301 Redirects table name
    $table_name = $wpdb->prefix . 'eps_redirects';
    
    // Check if table exists
    if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") !== $table_name) {
        return new WP_REST_Response([
            'error' => 'EPS 301 Redirects plugin table not found',
            'message' => 'Please install and activate the EPS 301 Redirects plugin'
        ], 404);
    }
    
    // Get all active redirects
    $redirects = $wpdb->get_results(
        "SELECT id, url_from, url_to, type, status FROM {$table_name} WHERE status = 'active'",
        ARRAY_A
    );
    
    if ($redirects === null) {
        return new WP_REST_Response([
            'error' => 'Database query failed',
            'message' => $wpdb->last_error
        ], 500);
    }
    
    return new WP_REST_Response($redirects, 200);
}
