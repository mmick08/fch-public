// Wir brauchen keine Binary-Daten mehr laden!
// Wir setzen die URL direkt fest (öffentlich abrufbar über GitHub).
const bgUrl = "https://raw.githubusercontent.com/mmick08/fch-public/main/images/gamesthisweek.png";

// Deine Daten liegen in items[0].json.data (vom Aggregate Node)
// Falls der Aggregate Node anders eingestellt ist, evtl. nur items[0].json
const matchesArray = items[0].json.data || items[0].json;

const matchesHtml = matchesArray.map(item => {
  // Zugriff anpassen, falls nötig (manchmal ist output direkt im item, manchmal verschachtelt)
  const m = item.output || item;

  if (!m || !m.age_group) return "";

  return `
    <div class="match-row">
      <div class="left-col">
        <div class="top-line">
          <span class="age">${m.age_group}</span>
          <span class="pairing">${m.match_pairing}</span>
        </div>
        <div class="date-line">
          ${m.date_formatted} <span class="time">${m.time_formatted}</span>
        </div>
      </div>
      <div class="right-col">
        <span class="type">${m.type}</span>
      </div>
    </div>
  `;
}).join('');

const html = `
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap" rel="stylesheet">
<style>
  body {
    margin: 0; padding: 0;
    width: 1080px; height: 1350px;

    /* HIER IST DIE ÄNDERUNG: URL statt Base64 */
    background-image: url('${bgUrl}');

    background-size: cover;
    background-repeat: no-repeat;
    font-family: 'Oswald', sans-serif;
    color: white;
    box-sizing: border-box;
    padding-top: 310px;
    padding-left: 140px;
    padding-right: 140px;
  }

  /* ... (Der Rest vom CSS bleibt exakt gleich wie vorher) ... */
  .match-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 50px; }
  .age { color: #FFCC00; font-weight: 700; font-size: 55px; margin-right: 25px; display: inline-block; min-width: 90px; }
  .pairing { font-weight: 700; font-size: 55px; text-transform: uppercase; }
  .date-line { font-weight: 400; font-size: 45px; margin-top: 2px; color: #FFFFFF; }
  .time { margin-left: 15px; }
  .type { color: #FFCC00; font-weight: 700; font-size: 60px; text-align: right; }
</style>
</head>
<body>
  ${matchesHtml}
</body>
</html>
`;

return [{ json: { html: html } }];