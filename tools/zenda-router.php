<?php
// Local screenshot server: override URLs without modifying WordPress settings.
$root = dirname(__DIR__, 2).'/Zenda Store';
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/');
if ($path !== '/' && is_file($root.$path)) {
    return false;
}
define('WP_HOME', 'http://127.0.0.1:8139');
define('WP_SITEURL', 'http://127.0.0.1:8139');
require $root.'/index.php';
