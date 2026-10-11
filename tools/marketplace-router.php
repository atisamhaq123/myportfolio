<?php
// Serve Laravel's existing public uploads without changing its storage link.
$root = dirname(__DIR__, 2).'/MarketPlace Application';
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/');
if (str_starts_with($path, '/storage/') && !str_contains($path, '..')) {
    $file = $root.'/storage/app/public/'.substr($path, 9);
    if (is_file($file)) {
        header('Content-Type: '.mime_content_type($file));
        readfile($file);
        return;
    }
}
return require $root.'/vendor/laravel/framework/src/Illuminate/Foundation/resources/server.php';
