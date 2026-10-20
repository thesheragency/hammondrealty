// Temporary, administrator-only evidence for explicitly authorized test submissions.
// No message content, addresses, credentials or real-user submissions are recorded.
add_filter('gform_notification', function ($notification, $form, $entry) {
    if (strpos(wp_json_encode($entry), 'BH_GF_TEST_') === false) {
        return $notification;
    }
    $GLOBALS['bh_gf_test_context'] = array(
        'form_id' => (int) $form['id'],
        'entry_id' => (int) $entry['id'],
        'notification_id' => (string) $notification['id'],
    );
    return $notification;
}, 10, 3);

function bh_gf_record_test_mail($success, $error_code = '') {
    if (empty($GLOBALS['bh_gf_test_context'])) {
        return;
    }
    global $phpmailer;
    $rows = get_option('bh_gf_test_mail_evidence', array());
    $rows[] = array_merge($GLOBALS['bh_gf_test_context'], array(
        'accepted' => (bool) $success,
        'transport' => isset($phpmailer->Mailer) ? $phpmailer->Mailer : 'unknown',
        'error_code' => $error_code,
        'time' => gmdate('c'),
    ));
    update_option('bh_gf_test_mail_evidence', array_slice($rows, -30), false);
    unset($GLOBALS['bh_gf_test_context']);
}
add_action('wp_mail_succeeded', function () { bh_gf_record_test_mail(true); });
add_action('wp_mail_failed', function ($error) {
    bh_gf_record_test_mail(false, $error->get_error_code());
});
add_action('gform_after_submission', function () {
    unset($GLOBALS['bh_gf_test_context']);
}, 100);

add_action('rest_api_init', function () {
    register_rest_route('bh-form-check/v1', '/results', array(
        'methods' => 'GET',
        'permission_callback' => function () { return current_user_can('manage_options'); },
        'callback' => function () {
            return array('mail' => get_option('bh_gf_test_mail_evidence', array()));
        },
    ));
});
