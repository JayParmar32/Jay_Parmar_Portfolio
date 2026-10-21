
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

    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        exit("Please submit the contact form.");
    }

    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $phone = trim($_POST["phone"] ?? "");
    $subject = trim($_POST["subject"] ?? "");
    $message = trim($_POST["message"] ?? "");

    if (
        $name === "" ||
        !filter_var($email, FILTER_VALIDATE_EMAIL) ||
        $subject === "" ||
        $message === ""
    ) {
        exit("Please fill all required fields correctly.");
    }

    $sql = "INSERT INTO contact_messages
        (name, email, phone, subject, message)
        VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "sssss",
        $name,
        $email,
        $phone,
        $subject,
        $message
    );

    $stmt->execute();

    echo "SUCCESS! Your message was saved to the database.";

    $stmt->close();
    $conn->close();
} catch (Throwable $e) {
    http_response_code(500);
    echo "Database error: " .
        htmlspecialchars($e->getMessage());
}
?>
