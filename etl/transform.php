<?php
// Bindet das Skript 130_extract.php für Rohdaten ein
$data = include('extract.php');
var_dump($data);

// Prüfen, ob die Daten das erwartete Format haben
if (isset($data['timestamp'], $data['iss_position']['latitude'], $data['iss_position']['longitude'])) {
    // Transformierte Daten für die Datenbank
    $transformedData = [
        'timestamp' => $data['timestamp'],
        'latitude' => $data['iss_position']['latitude'],
        'longitude' => $data['iss_position']['longitude'],
    ];
} else {
    die('Ungültiges Datenformat.');
}

// Verbindung zur Datenbank herstellen
require_once 'config.php';

try {
    // PDO-Verbindung erstellen
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Statement zum Einfügen der Daten
    $sql = "INSERT INTO ISS_Position (timestamp, latitude, longitude) VALUES (:timestamp, :latitude, :longitude)";

    // Vorbereitung des Statements
    $stmt = $pdo->prepare($sql);

    // Bindung der Parameter und Ausführung des Statements
    $stmt->execute([
        ':timestamp' => $transformedData['timestamp'],
        ':latitude' => $transformedData['latitude'],
        ':longitude' => $transformedData['longitude'],
    ]);

    echo "Daten erfolgreich in die Datenbank eingefügt.";

} catch (PDOException $e) {
    die("Fehler bei der Verbindung zur Datenbank: " . $e->getMessage());
}
?>
