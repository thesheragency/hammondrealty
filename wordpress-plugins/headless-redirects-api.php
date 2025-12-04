<?php
/**
 * Plugin Name: Headless Redirects API
 * Description: Exposes 301 Redirects (by WebFactory Ltd) via REST API for headless WordPress setups
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
 * Returns all active redirects from 301 Redirects plugin by WebFactory Ltd
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', function () {
    register_rest_route('headless/v1', '/redirects', [
        'methods' => 'GET',
        'callback' => 'headless_get_redirects',
        'permission_callback' => '__return_true', // Public endpoint
    ]);
});

/**
 * Get all active redirects from 301 Redirects plugin by WebFactory Ltd
 */
function headless_get_redirects() {
    global $wpdb;
    
    // 301 Redirects by WebFactory Ltd uses wp_ts_redirects table
    $table_name = $wpdb->prefix . 'ts_redirects';
    
    // Check if table exists
    if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") !== $table_name) {
        return new WP_REST_Response([
            'error' => '301 Redirects plugin table not found',
            'message' => 'Please install and activate the 301 Redirects plugin by WebFactory Ltd'
        ], 404);
    }
    
    // Get all redirects (WebFactory plugin uses 'status' column: 1=active, 0=inactive)
    $redirects = $wpdb->get_results(
        "SELECT id, url_from, url_to, type, status FROM {$table_name} WHERE status = 1",
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
