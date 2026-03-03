let chapters = [];

function showTab(id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}

function addChapter() {
  const container = document.getElementById("chapters");

  const div = document.createElement("div");
  div.className = "chapter";

  div.innerHTML = `
    <input placeholder="Chapter Title">
    <textarea placeholder="Write your chapter here..."></textarea>
    <button onclick="this.parentElement.remove()">Delete Chapter</button>
  `;

  container.appendChild(div);
}

function calculateAnalytics() {
  let totalWords = 0;
  let dialogueWords = 0;
  let povCounts = {};
  let charCounts = {};

  document.querySelectorAll(".chapter textarea").forEach(textarea => {
    let text = textarea.value;

    // Total words
    let words = text.trim().split(/\s+/).filter(Boolean);
    totalWords += words.length;

    // Dialogue words
    let dialogue = text.match(/["“”](.*?)["“”]/g) || [];
    dialogueWords += dialogue.join(" ").split(/\s+/).filter(Boolean).length;

    // POV counts
    let povMatches = text.match(/\[pov:(.*?)\]/g) || [];
    povMatches.forEach(m => {
      let name = m.replace("[pov:","").replace("]","");
      povCounts[name] = (povCounts[name]||0)+1;
    });

    // Character mentions
    let charMatches = text.match(/@char\((.*?)\)/g) || [];
    charMatches.forEach(m => {
      let name = m.replace("@char(","").replace(")","");
      charCounts[name] = (charCounts[name]||0)+1;
    });
  });

  let dialoguePercent = totalWords
    ? ((dialogueWords/totalWords)*100).toFixed(1)
    : 0;

  document.getElementById("stats").innerHTML = `
    <div class="chapter">
      <h3>Total Words: ${totalWords}</h3>
      <h3>Dialogue %: ${dialoguePercent}%</h3>
      <h3>POV Distribution:</h3>
      <pre>${JSON.stringify(povCounts, null, 2)}</pre>
      <h3>Character Mentions:</h3>
      <pre>${JSON.stringify(charCounts, null, 2)}</pre>
    </div>
  `;
}
