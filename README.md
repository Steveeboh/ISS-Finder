# ISS-Finder
IM 3 Arbeit

Wetter-API Ungenauigkeiten
Die angezeigten Wetterdaten stammen von einer externen Wetter-API. Aufgrund von API-Beschränkungen und unterschiedlichen Datenquellen kann die Genauigkeit der Wettervorhersagen variieren. Nutzer sollten sich bewusst sein, dass die angezeigten Informationen nicht immer exakt sind. Es gäbe 3 verschiedene Wetterzustände für Sonnig, bewölkt und regenerisch welche dynamisch anhand der Wolken und Hintergrundfarben angezeigt werden. Zudem gibt es einen Nachtmodus der aktiv wird sobald die Sonne untergegangen ist

Standortermittlung auf der Landing- und Finder-Seite
Die Funktion zum laden der API's auf der Landing-Seite funktioniert möglicherweise nicht wie erwartet. Dies kann zu längeren Ladezeiten der API's führen.

Landing-Seite auf iPhone
Auf iPhones wird die Landing-Seite als Video angezeigt. Dies ist ein generelles problem beim Safari browser. Auf Chrome funktionieren die Funktionen jedoch einwandfrei.

Bogen-Elemente: Die bogenförmigen Designelemente sind möglicherweise nicht optimal für alle Bildschirmgrößen. Da der Bogen eine fixe Breite aufweisen muss damit die anderen Elemente sich dynamisch darauf Orientieren war es nicht möglich diesen Responsive zu designen. Aus diesem Grund wurde dieses Feature für kleinere Bildschirmgrössen gestrichen.

Tag-Sunset-Zeit Verschiebung
Die angezeigte Sunset-Zeit für den aktuellen Tag kann bei gewissen Bildschirmgrössen leicht nach unten verschoben sein.

Validierungsprobleme
Das Html der finder.html seite zeigte probleme in der Validierung auf. Dies ist der Fall da gewisse HTML elemente im Javascript beeinflusst werden und sich Objekte anhand des schwarzen bogen SVG's dynamisch auf der Seite Positionieren. Dies führt zu fehlern bei der Validierung.