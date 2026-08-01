# KIEZWERK Immobilien — Website

Ein statisches, mehrsprachig erweiterbares Website-Template für ein Berliner
Immobilienbüro. Reines HTML/CSS/JS — kein Build-Prozess, kein Backend nötig,
läuft kostenlos auf GitHub Pages.

## Seiten

- `index.html` — Startseite mit „Kiez-Kompass"-Navigator
- `immobilien.html` — Objektliste, filterbar nach Kiez
- `ueber-uns.html` — Über das Büro / Team
- `kontakt.html` — Kontaktformular + Anfahrt
- `impressum.html` — Impressum (§ 5 DDG) — **Pflichtangabe, Platzhalter ausfüllen**
- `datenschutz.html` — Datenschutzerklärung (Art. 13 DSGVO)

## In 5 Minuten auf GitHub Pages veröffentlichen

1. Erstellen Sie ein neues **öffentliches** Repository auf github.com, z. B. `kiezwerk-immobilien`.
2. Laden Sie den kompletten Inhalt dieses Ordners in das Repository hoch
   (per Drag-and-drop im Browser, oder per Git):
   ```bash
   cd kiezwerk
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<ihr-benutzername>/kiezwerk-immobilien.git
   git push -u origin main
   ```
3. Im Repository: **Settings → Pages**.
4. Unter „Build and deployment" → Source: **Deploy from a branch** wählen.
5. Branch: **main**, Ordner: **/ (root)** → **Save**.
6. Nach 1–2 Minuten ist die Seite live unter:
   `https://<ihr-benutzername>.github.io/kiezwerk-immobilien/`

### Eigene Domain (optional, weiterhin kostenlos)
Legen Sie eine Datei `CNAME` mit Ihrer Domain (z. B. `www.kiezwerk-immobilien.de`)
im Hauptverzeichnis an und richten Sie bei Ihrem Domain-Anbieter einen
CNAME-Eintrag auf `<ihr-benutzername>.github.io` ein. Details:
https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site

## Vor dem Livegang unbedingt erledigen

Alles, was so markiert ist, muss vor der Veröffentlichung ersetzt werden:

```
Straße Nr., 10119 Berlin
```

Betroffene Stellen:

- [ ] **Impressum** (`impressum.html`) — Firma, Anschrift, Geschäftsführung, Handelsregister, USt-ID, Aufsichtsbehörde nach § 34c GewO
- [ ] **Kontaktdaten** im Footer aller Seiten und auf `kontakt.html`
- [ ] **E-Mail-Adresse** `info@kiezwerk-beispiel.de` → Ihre echte Adresse (in allen `mailto:`-Links)
- [ ] **Datenschutzerklärung** (`datenschutz.html`) — Verantwortlicher, ggf. Datenschutzbeauftragte:r
- [ ] Objektfotos: Die Immobilien-Karten nutzen aktuell schematische SVG-Illustrationen statt Fotos — vor dem Livegang durch echte, rechtefreie Aufnahmen ersetzen (Personen auf Fotos benötigen ggf. eine Einwilligung nach § 22 KUG)
- [ ] Google Maps in `kontakt.html`: aktuell eine Beispielsuche nach „Torstraße Berlin" — auf die echte Büroadresse anpassen

## Was hier bereits DSGVO-bewusst umgesetzt ist

- **Cookie-Banner** mit echter Wahlfreiheit (Ablehnen ist genauso leicht wie Zustimmen — keine „Dark Patterns")
- **Keine Cookies/Tracking ohne Einwilligung** — nur eine technisch notwendige `localStorage`-Speicherung für die Banner-Auswahl selbst (fällt unter § 25 Abs. 2 TTDSG)
- **Google Maps per Klick-zum-Laden** — die Karte verbindet sich erst nach aktiver Zustimmung mit Google-Servern
- **Schriften selbst gehostet** (Fraunces, IBM Plex Sans/Mono liegen lokal in `assets/fonts/`) — es wird **keine** Verbindung zu `fonts.googleapis.com` aufgebaut. Das umgeht das bekannte Google-Fonts-Abmahnrisiko (LG München I, Urt. v. 20.01.2022)
- **Kontaktformular mit Einwilligungs-Checkbox**, die vor dem Absenden bestätigt werden muss
- **Impressum & Datenschutzerklärung** als vollständige Vorlagen (mit Platzhaltern) verlinkt im Footer jeder Seite

⚠️ Diese Vorlage ersetzt keine Rechtsberatung. Lassen Sie Impressum und
Datenschutzerklärung vor dem Livegang von einer/einem Fachanwält:in für
IT-/Datenschutzrecht prüfen — insbesondere wenn Sie später Google Analytics,
ein CRM, Newsletter-Tools oder ein Formular-Backend wie Formspree/Netlify
Forms hinzufügen (dafür ist regelmäßig ein Auftragsverarbeitungsvertrag
nach Art. 28 DSGVO nötig, und die Datenschutzerklärung muss ergänzt werden).

## Kontaktformular: Hinweis zum Versand

GitHub Pages liefert nur statische Dateien aus — es gibt keinen eigenen Server.
Das Formular auf `kontakt.html` öffnet daher aktuell das E-Mail-Programm des
Besuchers (`mailto:`). Für einen komfortableren, direkten Versand ohne eigenes
Backend eignen sich kostenlose/günstige, in der EU nutzbare Form-Backends wie:

- [Formspree](https://formspree.io/) (`action="https://formspree.io/f/DEINE-ID"`)
- [Netlify Forms](https://www.netlify.com/) (erfordert Hosting auf Netlify statt GitHub Pages)

Bei jeder dieser Lösungen muss die Datenschutzerklärung um den jeweiligen
Anbieter ergänzt werden.

## Anpassen

- Farben, Schriftgrößen, Abstände: `assets/css/style.css` (CSS-Variablen ganz oben unter `:root`)
- Interaktivität (Menü, Cookie-Banner, Filter, Karte): `assets/js/main.js`
- Weitere Kieze/Objekte: Karten in `index.html` / `immobilien.html` kopieren und anpassen

## Struktur

```
kiezwerk/
├── index.html
├── immobilien.html
├── ueber-uns.html
├── kontakt.html
├── impressum.html
├── datenschutz.html
├── README.md
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── fonts/  (selbst gehostete Fraunces, IBM Plex Sans, IBM Plex Mono)
```
