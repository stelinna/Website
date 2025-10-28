<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// DATABASE CONNECTION - UPDATED
$host = '127.0.0.1';
$dbname = 'comments';
$username = 'root';
$password = 'Inna1998';  // Empty password
$port = 3306;    // Standard MySQL port

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;port=$port;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// ... rest of your code stays the same

// POST - Add new comment
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $article_id = trim($data['article_id'] ?? '');
    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $comment = trim($data['comment'] ?? '');

    // Validation
    if (empty($article_id) || empty($name) || empty($email) || empty($comment)) {
        echo json_encode(['success' => false, 'error' => 'All fields are required']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'error' => 'Invalid email address']);
        exit;
    }

    if (strlen($comment) < 3) {
        echo json_encode(['success' => false, 'error' => 'Comment is too short']);
        exit;
    }

    try {
        $stmt = $pdo->prepare('
            INSERT INTO comments (article_id, author_name, author_email, comment_text, created_at, status) 
            VALUES (:article_id, :name, :email, :comment, NOW(), "approved")
        ');
        
        $success = $stmt->execute([
            ':article_id' => $article_id,
            ':name' => $name,
            ':email' => $email,
            ':comment' => $comment
        ]);

        if ($success) {
            echo json_encode(['success' => true, 'message' => 'Comment posted successfully']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to save comment']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
    exit;
}

// GET - Fetch comments
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $article_id = trim($_GET['article_id'] ?? '');

    if (empty($article_id)) {
        echo json_encode(['success' => false, 'error' => 'Missing article_id parameter']);
        exit;
    }

    try {
        $stmt = $pdo->prepare('
            SELECT 
                author_name, 
                comment_text, 
                DATE_FORMAT(created_at, "%M %d, %Y at %h:%i %p") as date 
            FROM comments 
            WHERE article_id = :article_id AND status = "approved"
            ORDER BY created_at DESC
        ');
        
        $stmt->execute([':article_id' => $article_id]);
        $comments = $stmt->fetchAll();

        echo json_encode(['success' => true, 'comments' => $comments]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
?>