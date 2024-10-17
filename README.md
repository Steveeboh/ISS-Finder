# ISS-Finder
IM 3 Arbeit



## Kurzbeschreibung:
ISS Finder ist eine interaktive Plattform, die Benutzern ermöglicht, die Position der Internationalen Raumstation (ISS) relativ zu deiner Position in Echtzeit zu verfolgen. Die Website bietet aktuelle Wetterdaten, lokale Sonnen- und Mondzeiten sowie die Zeit seit dem letzten Vorbeiflug der ISS. Damit ist sie eine ideale Anlaufstelle für alle, die am Himmel interessiert sind.

## Autoren
Diese Website wurde von Steve Walker und Cecilia Commisso erstellt.

## Features
Echtzeit-Tracking der ISS
Aktuelle Wetterinformationen
Berechnung der Sonnen- und Mondzeiten
Benutzerstandortermittlung
Ansprechendes Design mit Animationen und SVG-Grafiken
Verwendete Technologien
HTML5
CSS3
JavaScript
PHP für die Backend-Logik
MySQL für die Datenbankverwaltung über phpMyAdmin
API-Integration für Wetter- und Geolokalisierungsdienste
SVG für Grafiken und Animationen
Hoster: Infomaniak
Datenbankstruktur

## Die Datenbank für die ISS-Daten, verwaltet über phpMyAdmin, umfasst die folgenden Tabellen:
iss_positions: Speichert die Latitude und Longitude der ISS.
Spalten: id, latitude, longitude, timestamp


## Während der Entwicklung dieser Website habe ich wertvolle Erfahrungen in folgenden Bereichen gesammelt:
Umgang mit APIs zur Geolokalisierung und Wetterdaten
Erstellung von responsiven Designs, die auf verschiedenen Geräten gut funktionieren
Einsatz von JavaScript zur Interaktion mit DOM-Elementen und zur Aktualisierung von Inhalten in Echtzeit
Verwaltung von Datenbanken über phpMyAdmin
Benutzte Ressourcen
Open-Meteo API für Wetterdaten
Sunrise-Sunset API für Sonnenaufgang- und Sonnenuntergangszeiten
ISS Tracker API für ISS-Positionsdaten
Google Fonts für Schriftarten
Erweiterungsmöglichkeiten
Aufsetzung von Webdomain
Starten von Webserver
Umgang mit Datenbanken

## Probleme / Bugs

Wetter-API Ungenauigkeiten
Die angezeigten Wetterdaten stammen von einer externen Wetter-API. Aufgrund von API-Beschränkungen und unterschiedlichen Datenquellen kann die Genauigkeit der Wettervorhersagen variieren. Nutzer sollten sich bewusst sein, dass die angezeigten Informationen nicht immer exakt sind. Es gäbe 3 verschiedene Wetterzustände für Sonnig, bewölkt und regenerisch welche dynamisch anhand der Wolken und Hintergrundfarben angezeigt werden. Zudem gibt es einen Nachtmodus der aktiv wird sobald die Sonne untergegangen ist.

um die verschiedenen weather states zu testen kann man diese console comandds verwenden:
updateWeatherAppearance(0);  // For sunny
updateWeatherAppearance(45);  // For cloudy
updateWeatherAppearance(61);  // For rain

Der Nachtmodus funktioniert nur zuverlässig wenn er in der Nacht getestet wird. Es gibt einen debuging modus welcher im finder.html auskomentiert ist bei diesem wird die mond position auf dem weissen bogen jedoch nicht zuverlässig dargestellt

Bei gewissen wetter in kombination mit dem nacht modus kann es zu komplikationen kommen.


Standortermittlung auf der Landing- und Finder-Seite
Die Funktion zum laden der API's auf der Landing-Seite funktioniert möglicherweise nicht wie erwartet. Dies kann zu längeren Ladezeiten der API's führen.

Landing-Seite auf iPhone
Auf iPhones wird die Landing-Seite als Video angezeigt. Dies ist ein generelles problem beim Safari browser. Auf Chrome funktionieren die Funktionen jedoch einwandfrei.

Bogen-Elemente: Die bogenförmigen Designelemente sind möglicherweise nicht optimal für alle Bildschirmgrößen. Da der Bogen eine fixe Breite aufweisen muss damit die anderen Elemente sich dynamisch darauf Orientieren war es nicht möglich diesen Responsive zu designen. Aus diesem Grund wurde dieses Feature für kleinere Bildschirmgrössen gestrichen.

Tag-Sunset-Zeit Verschiebung
Die angezeigte Sunset-Zeit für den aktuellen Tag kann bei gewissen Bildschirmgrössen leicht nach unten verschoben sein.

Validierungsprobleme
Das Html der finder.html seite zeigte probleme in der Validierung auf. Dies ist der Fall da gewisse HTML elemente im Javascript beeinflusst werden und sich Objekte anhand des schwarzen bogen SVG's dynamisch auf der Seite Positionieren. Dies führt zu fehlern bei der Validierung.

## Die Website bietet zahlreiche Möglichkeiten zur Erweiterung, darunter:
Integration weiterer Wetterdatenquellen für genauere Vorhersagen
Erweiterung um mobile Apps für iOS und Android
Hinzufügen von Benutzernotizen oder -benachrichtigungen für bevorstehende ISS-Sichtungen
Implementierung eines Forum- oder Community-Bereichs, in dem Nutzer Erfahrungen und Tipps austauschen können