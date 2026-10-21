<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn = new mysqli(
        "localhost",
        "root",
        "",
        "jay_portfolio"
    );

    $conn->set_charset("utf8mb4");

    $stmt = $conn->prepare(
        "INSERT INTO contact_messages
        (name, email, phone, subject, message)
        VALUES (?, ?, ?, ?, ?)"
    );

    $name = "Test User";
    $email = "test@example.com";
    $phone = "";
    $subject = "Database Test";
    $message = "Testing database connection";

    $stmt->bind_param(
        "sssss",
        $name,
        $email,
        $phone,
        $subject,
        $message
    );

    $stmt->execute();

    echo "SUCCESS: Data database mein save ho gaya!";
} catch (Throwable $e) {
    http_response_code(500);
    echo "ERROR: " . htmlspecialchars($e->getMessage());
}
