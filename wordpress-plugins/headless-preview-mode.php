<?php
/**
 * Plugin Name: Headless Preview Mode
 * Description: Redirects WordPress preview links to the headless Next.js frontend
 * Version: 1.0.0
 * Author: Your Name
 * 
 * INSTALLATION:
 * 1. Create this file at: wp-content/mu-plugins/headless-preview-mode.php
 *    (Create the mu-plugins folder if it doesn't exist)
 * 2. Add WP_PREVIEW_SECRET to your wp-config.php:
 *    define('WP_PREVIEW_SECRET', 'your-secure-secret-here');
 * 3. Set the same WP_PREVIEW_SECRET in your Next.js environment variables
 * 4. Set HEADLESS_FRONTEND_URL in wp-config.php:
 *    define('HEADLESS_FRONTEND_URL', 'https://your-nextjs-site.com');
 */

// Only run if constants are defined
if (!defined('WP_PREVIEW_SECRET') || !defined('HEADLESS_FRONTEND_URL')) {
    return;
}

/**
 * Override preview link for posts
 */
add_filter('preview_post_link', function($preview_link, $post) {
    if (!$post) return $preview_link;
    
    $frontend_url = rtrim(HEADLESS_FRONTEND_URL, '/');
    $secret = WP_PREVIEW_SECRET;
    $post_id = $post->ID;
    $post_type = $post->post_type;
    
    // Map WordPress post types to our preview types
    $type = $post_type === 'page' ? 'page' : 'post';
    
    return sprintf(
        '%s/api/preview?secret=%s&id=%d&type=%s',
        $frontend_url,
        urlencode($secret),
        $post_id,
        $type
    );
}, 10, 2);

/**
 * Override preview link for pages
 */
add_filter('preview_page_link', function($preview_link, $post) {
    if (!$post) return $preview_link;
    
    $frontend_url = rtrim(HEADLESS_FRONTEND_URL, '/');
    $secret = WP_PREVIEW_SECRET;
    $post_id = $post->ID;
    
    return sprintf(
        '%s/api/preview?secret=%s&id=%d&type=page',
        $frontend_url,
        urlencode($secret),
        $post_id
    );
}, 10, 2);

/**
 * Also handle the post row actions preview link
 */
add_filter('post_link', function($permalink, $post, $leavename) {
    // Only modify for preview contexts
    if (!is_admin()) return $permalink;
    if (!isset($_GET['preview']) && !isset($_GET['preview_id'])) return $permalink;
    
    return $permalink;
}, 10, 3);
