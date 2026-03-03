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
    <button onclick="this.parentElement.remove()">Delete</button>
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

    let words = text.trim().split(/\s+/).filter(Boolean);
    totalWords += words.length;

    let dialogue = text.match(/["“”](.*?)["“”]/g) || [];
    dialogueWords += dialogue.join(" ").split(/\s+/).filter(Boolean).length;

    let povMatches = text.match(/\[pov:(.*?)\]/g) || [];
    povMatches.forEach(m => {
      let name = m.replace("[pov:","").replace("]","");
      povCounts[name] = (povCounts[name]||0)+1;
    });

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
    <p><strong>Total Words:</strong> ${totalWords}</p>
    <p><strong>Dialogue %:</strong> ${dialoguePercent}%</p>
    <p><strong>POV Distribution:</strong> ${JSON.stringify(povCounts)}</p>
    <p><strong>Character Mentions:</strong> ${JSON.stringify(charCounts)}</p>
  `;
}
