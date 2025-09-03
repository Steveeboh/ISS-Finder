import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#0a001f]">
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#1E4959]/30 via-[#0a001f]/60 to-[#DBD2A4]/20"
        style={{ mixBlendMode: 'color-dodge' }}
      />

      <main className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="text-white">Datenschutzerklärung</span>
          </h1>
          <p className="text-xl text-gray-300">Stand: 17. Dezember 2024</p>
        </div>

        {/* Content Card */}
        <div className="backdrop-blur-sm bg-black/20 p-8 rounded-lg border border-[#1E4959]/30 max-w-4xl mx-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Verantwortlich</h2>
            <div className="mb-4">
              <p>Rigged Motion Studios</p>
              <p>Breitenrainpl. 29</p>
              <p>3014 Bern</p>
              <p>Schweiz</p>
              <p>E-Mail: rigged.motion@gmail.com</p>
            </div>
            <p className="mb-4">
              Diese Datenschutzerklärung regelt die Bearbeitung von Personendaten durch MAXfabrik (nachfolgend «wir» oder «uns»). Sie richtet sich an alle Personen, deren Daten wir im Zusammenhang mit der Nutzung unserer Website und unserer Dienstleistungen bearbeiten.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Geltungsbereich und Zweck der Datenbearbeitung</h2>
            <p className="mb-4">
              Wir sind eine Werbeagentur mit Sitz in der Schweiz. Unsere Webseite dient in erster Linie der Kontaktaufnahme mit potenziellen Kunden, der Präsentation unseres Teams, unseres Portfolios sowie unserer Produkte und Dienstleistungen. Ein Online-Shop wird nicht betrieben; Produktanfragen und -verkäufe erfolgen über persönliche Kontaktaufnahme.
            </p>
            <p className="mb-4">
              Diese Datenschutzerklärung legt dar, wie wir Personendaten erheben, bearbeiten, speichern, an Dritte weitergeben und schützen. Der Begriff «Personendaten» umfasst alle Informationen, die sich auf eine bestimmte oder bestimmbare natürliche Person beziehen. Wir bearbeiten Personendaten unter Einhaltung der anwendbaren schweizerischen Datenschutzgesetze (insbesondere DSG) sowie, soweit relevant, weiterer datenschutzrechtlicher Vorgaben.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Erhebung und Arten von Personendaten</h2>
            <p className="mb-4">
              Wir erheben Personendaten grundsätzlich direkt bei Ihnen, etwa wenn Sie mit uns Kontakt aufnehmen. Zudem erfassen wir technisch notwendige Daten automatisch beim Besuch unserer Website.
            </p>

            <h3 className="text-xl font-semibold mb-3">3.1 Daten, die Sie uns zur Verfügung stellen</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">
                Kontaktaufnahme: Wenn Sie mit uns per E-Mail oder über ein Kontaktformular auf unserer Website in Verbindung treten, bearbeiten wir die von Ihnen mitgeteilten Daten wie Name, Vorname, E-Mail-Adresse, Telefonnummer sowie die Inhalte Ihrer Anfrage. Diese Daten werden zur Beantwortung Ihrer Anfrage und für spätere Kommunikation (z. B. Angebotsunterbreitung oder Vertragsverhandlungen) verwendet.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.2 Automatisch erfasste Daten beim Webseitenbesuch</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">
                Server-Logfiles: Beim Besuch unserer Website erheben wir automatisch technische Daten, wie Ihre IP-Adresse (ggf. in gekürzter/anonymisierter Form), Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL sowie Datum und Uhrzeit des Zugriffs. Diese Daten sind für den sicheren, stabilen und technisch einwandfreien Betrieb der Website erforderlich und dienen insbesondere der Fehleranalyse und -prävention, sowie zur Sicherstellung der IT-Sicherheit.
              </li>
              <li className="mb-2">
                Cookies: Wir verwenden auf unserer Website Cookies. Hierbei handelt es sich um kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Wir nutzen in erster Linie essenzielle Cookies, die für den technischen Betrieb der Website notwendig sind und kein Tracking im Sinne einer Persönlichkeitsprofilierung vornehmen. Über die Einstellungen Ihres Browsers können Sie festlegen, ob Sie Cookies akzeptieren oder ablehnen möchten. Bitte beachten Sie, dass bestimmte Funktionen der Website ohne Cookies eingeschränkt sein können.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Zwecke und Rechtsgrundlagen der Datenbearbeitung</h2>
            <p className="mb-4">Wir bearbeiten Ihre Personendaten zu folgenden Zwecken:</p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Kommunikation und Vertragsvorbereitung: Um Ihre Anfragen zu beantworten, Vertragsbeziehungen vorzubereiten oder bestehende Beziehungen zu pflegen.</li>
              <li className="mb-2">Marketing und Präsentation: Um unser Portfolio, unsere Dienstleistungen und unser Team vorzustellen sowie interessierten Personen Informationen bereitzustellen, die für eine potenzielle Geschäftsbeziehung relevant sind.</li>
              <li className="mb-2">Sicherer und stabiler Betrieb der Website: Zur Gewährleistung der IT-Sicherheit, Störungsbehebung, Fehleranalyse sowie Auswertung technischer Nutzungsdaten.</li>
              <li className="mb-2">Erfüllung gesetzlicher Verpflichtungen: Soweit rechtlich erforderlich, um unseren gesetzlichen Pflichten wie Buchführung, Archivierung oder Auskunftserteilung an Behörden nachzukommen.</li>
            </ul>
            <p className="mb-4">
              Rechtsgrundlagen sind je nach Einzelfall die Erfüllung eines Vertrages oder vorvertraglicher Massnahmen, unsere berechtigten Interessen (z. B. am sicheren und effizienten Betrieb unserer Website) sowie allenfalls Ihre Einwilligung, sofern diese gesetzlich erforderlich ist.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Verwendung von Drittanbieterdiensten</h2>
            <h3 className="text-xl font-semibold mb-3">5.1 Tally (Formular-Tool)</h3>
            <p className="mb-4">
              Wir setzen das Tool «Tally» ein, um Kontaktformulare bereitzustellen und Ihre Eingaben (Name, Vorname, Telefonnummer, E-Mail-Adresse, Nachricht) strukturiert und sicher entgegenzunehmen. Die von Ihnen eingetragenen Daten werden an Tally übermittelt und auf deren Servern verarbeitet. Tally kann Daten gegebenenfalls in Staaten ausserhalb der Schweiz bearbeiten. Soweit hierbei ein Datenexport in ein Land ohne angemessenen Datenschutzniveau stattfindet, stützen wir uns auf geeignete Garantien wie Standardvertragsklauseln.
            </p>
            <p className="mb-4">
              Weitere Informationen zum Datenschutz bei Tally finden Sie in deren Datenschutzerklärung.
            </p>

            <h3 className="text-xl font-semibold mb-3">5.2 Google Analytics</h3>
            <p className="mb-4">
              Unsere Website verwendet Google Analytics, einen Webanalysedienst der Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland). Google Analytics setzt Cookies ein, um uns eine Analyse der Webseitennutzung zu ermöglichen. Die erzeugten Informationen über Ihre Nutzung unserer Website (inkl. gekürzter IP-Adresse) werden an Server von Google übertragen und dort verarbeitet. Gemäss Google werden bei aktivierter IP-Anonymisierung innerhalb der Schweiz oder des EWR die IP-Adressen gekürzt, bevor sie an Server von Google in den USA übermittelt werden.
            </p>
            <p className="mb-4">
              Sie können die Erfassung Ihrer Daten durch Google Analytics unterbinden, indem Sie entsprechende Browser-Add-Ons nutzen oder Ihre Browser-Einstellungen anpassen. Nähere Informationen zum Datenschutz von Google finden Sie in der Datenschutzerklärung von Google.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Datenweitergabe an Dritte</h2>
            <p className="mb-4">
              Wir geben Ihre Personendaten nur dann an Dritte weiter, wenn dies zur Erfüllung unserer (vor-)vertraglichen Pflichten notwendig ist, wir ein berechtigtes Interesse an der Weitergabe haben (z. B. an technische Dienstleister für den Betrieb unserer Website) oder Sie uns Ihre ausdrückliche Einwilligung erteilt haben. Zudem können wir gesetzlich oder behördlich verpflichtet sein, Daten offenzulegen.
            </p>
            <p className="mb-4">
              Drittdienstleister, an die wir Personendaten übermitteln, sind ihrerseits verpflichtet, diese vertraulich zu behandeln und nur im Rahmen der vertraglich vereinbarten Leistungserbringung sowie der geltenden Datenschutzgesetze zu bearbeiten.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Datenübermittlung ins Ausland</h2>
            <p className="mb-4">
              Grundsätzlich bearbeiten wir Personendaten in der Schweiz. Im Rahmen der Nutzung von Google Analytics und Tally kann es jedoch zu Datenübermittlungen in andere Länder, inklusive solcher ausserhalb des Europäischen Wirtschaftsraumes (EWR) oder der Schweiz, kommen. Soweit in solche Länder exportiert wird, für welche kein Angemessenheitsbeschluss vorliegt, stellen wir sicher, dass angemessene Datenschutzgarantien bestehen (z. B. Standardvertragsklauseln). Falls Sie weitere Informationen wünschen, können Sie uns unter den oben genannten Kontaktdaten erreichen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Datensicherheit</h2>
            <p className="mb-4">
              Wir setzen technische und organisatorische Sicherheitsmassnahmen ein, um Ihre Personendaten gegen unbefugten Zugriff, Missbrauch, Verlust, Manipulation oder Zerstörung zu schützen. Dazu gehören unter anderem verschlüsselte Übertragungen via SSL/TLS. Bitte beachten Sie, dass eine vollständig sichere Datenübertragung im Internet nicht garantiert werden kann. Wir überprüfen unsere Sicherheitsmassnahmen regelmässig und passen sie bei Bedarf an.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Speicherdauer von Personendaten</h2>
            <p className="mb-4">
              Wir speichern Ihre Personendaten nur so lange, wie dies für die jeweiligen Zwecke erforderlich ist oder wir ein berechtigtes Interesse an der Speicherung haben (z. B. zur Geltendmachung oder Abwehr von Ansprüchen oder zur Einhaltung gesetzlicher Aufbewahrungspflichten). Sobald keine Aufbewahrungsgründe mehr bestehen, werden die Daten gelöscht oder anonymisiert.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Rechte der betroffenen Personen</h2>
            <p className="mb-4">
              Unter dem schweizerischen Datenschutzrecht (und soweit anwendbar, weiterer Datenschutzbestimmungen) stehen Ihnen folgende Rechte zu:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Auskunft: Sie können Auskunft darüber verlangen, ob wir Personendaten von Ihnen bearbeiten und, falls ja, welche.</li>
              <li className="mb-2">Berichtigung: Sollten Ihre Personendaten unrichtig oder unvollständig sein, haben Sie das Recht auf Berichtigung.</li>
              <li className="mb-2">Löschung oder Einschränkung: Unter bestimmten Voraussetzungen können Sie die Löschung oder Einschränkung der Bearbeitung Ihrer Personendaten verlangen.</li>
              <li className="mb-2">Widerspruch: Sie haben das Recht, der Datenbearbeitung zu widersprechen, sofern dafür keine zwingenden schutzwürdigen Interessen bestehen.</li>
              <li className="mb-2">Datenübertragbarkeit: Soweit anwendbar, können Sie die Herausgabe jener Daten verlangen, die Sie uns bereitgestellt haben, in einem gängigen, maschinenlesbaren Format.</li>
            </ul>
            <p className="mb-4">
              Bitte beachten Sie, dass für diese Rechte gesetzlich vorgesehene Ausnahmen oder Beschränkungen bestehen können. Zur Ausübung Ihrer Rechte oder bei Fragen wenden Sie sich bitte an die oben genannte Kontaktadresse.
            </p>
            <p className="mb-4">
              Zudem steht Ihnen jederzeit das Recht zu, bei datenschutzrechtlichen Bedenken oder Verstössen den ordentlichen Rechtsweg zu beschreiten oder sich an die zuständige Datenschutzbehörde zu wenden. In der Schweiz ist dies der Eidgenössische Datenschutz- und Öffentlichkeitsbeauftragte (EDÖB).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Keine Verarbeitung besonderer Kategorien von Personendaten</h2>
            <p className="mb-4">
              Wir erheben in der Regel keine besonderen Kategorien von Personendaten (z. B. Gesundheitsdaten, Daten zur religiösen oder politischen Anschauung). Bitte übermitteln Sie uns keine solchen Angaben, es sei denn, dies ist ausdrücklich erforderlich.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Änderungen der Datenschutzerklärung</h2>
            <p className="mb-4">
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, etwa bei Änderungen der gesetzlichen Grundlagen oder unserer Geschäftstätigkeiten. Es gilt jeweils die aktuelle, auf unserer Website veröffentlichte Version.
            </p>
          </section>

          <div className="mt-12 pt-4 border-t border-[#1E4959]/30">
            <p>
              Mit der Nutzung unserer Website stimmen Sie der Bearbeitung Ihrer Personendaten im Rahmen dieser Datenschutzerklärung zu, soweit eine solche Einwilligung gesetzlich erforderlich ist.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
