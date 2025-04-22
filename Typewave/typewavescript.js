window.onload = function() {
   console.log("It's working!");
};

/* Define area */
const windowc = document.getElementById("windowcontainer");
const windowb = document.getElementById("window");
const exit = document.getElementById("close");
const settings = document.getElementById("settings");
const settingsc = document.getElementById("settingscontainer");
const soundbox = document.getElementById("soundbox");	
const message = document.getElementById("message");


let settingsactive = false;
let selectionsactive = false;


exit.addEventListener("click", function() {
   console.log("Exiting typewave!");
   window.location.href = "about:blank";
 });

settings.addEventListener("click", function() {
   if (settingsactive == false) {
      windowb.style.display = "none";
      settingsc.style.display = "grid";
      settingsactive = true;
   }
   else {
      settingsc.style.display = "none";
      windowb.style.display = "grid";
      settingsactive = false;
   }
 });



 selection.addEventListener("click", function() {
   if (selectionsactive === false) {
   soundbox.style.display = "grid";
   soundbox.style.animation = "fadein 0.5s forwards";
   message.style.display = "none";
   selectionsactive = true;
   }
   else if (selectionsactive === true) {
   soundbox.style.display = "none";
   soundbox.style.animation = "fadeout 0.5s forwards";
   message.style.display = "block";
   message.style.animation = "fadein 0.5s forwards";
   selectionsactive = false;
   }

 });





 document.getElementById("selection").addEventListener("click", () => {
   document.getElementById("soundbox").style.display = "block";
 });
 
 // Soundgruppen-Definition
 const soundGroups = {
   cream: {
     default: "sounds/src_audio_nk-cream_l.wav",
     enter: "sounds/src_audio_nk-cream_enter.wav",
     backspace: "sounds/src_audio_nk-cream_backspace.wav",
     capslock: "sounds/src_audio_nk-cream_caps lock.wav",
     shift: "sounds/src_audio_nk-cream_shift.wav",
     space: "sounds/src_audio_nk-cream_space.wav",
     tab: "sounds/src_audio_nk-cream_tab.wav",
   },
 };
 
 // Dynamisch die Gruppen-Buttons erzeugen
 const groupList = document.getElementById("group-list");
 Object.keys(soundGroups).forEach(groupName => {
   const li = document.createElement("li");
   li.textContent = groupName;
   li.style.cursor = "pointer";
   li.addEventListener("click", () => selectSoundGroup(groupName));
   groupList.appendChild(li);
 });
 
 let activeSounds = {};
 
 function selectSoundGroup(groupName) {
   const group = soundGroups[groupName];
   activeSounds = {};
 
   for (const [key, path] of Object.entries(group)) {
     const audio = new Audio(path);
     audio.preload = "auto";
     activeSounds[key] = audio;
   }
 
   alert(`Soundgruppe "${groupName}" geladen!`);
   soundbox.style.display = "none";
   soundbox.style.animation = "fadeout 0.5s forwards";
   message.style.display = "block";
   message.style.animation = "fadein 0.5s forwards";
   selectionsactive = false;
 }
 
 // Tasten → Sound-Typ zuweisen
 function getSoundKeyForEvent(e) {
   switch (e.code) {
     case "Enter": return "enter";
     case "Backspace": return "backspace";
     case "CapsLock": return "capslock";
     case "ShiftLeft":
     case "ShiftRight": return "shift";
     case "Space": return "space";
     case "Tab": return "tab";
     default: return "default";
   }
 }
 
 // Globales Keydown-Event
 window.addEventListener("keydown", (e) => {
   if (!activeSounds.default) return;
 
   const soundKey = getSoundKeyForEvent(e);
   const audio = activeSounds[soundKey] || activeSounds.default;
   const clone = audio.cloneNode();
   clone.play();
 });
 


// DOM-Elemente für das Mini-Fenster
const keystrokePopup = document.getElementById("keystroke-popup");
const keystrokeText = document.getElementById("keystroke-text");

// Variable, um das aktuelle Wort zu speichern
let currentWord = "";

// Funktion, um das Mini-Fenster anzuzeigen
function showKeystrokePopup(word) {
   keystrokeText.textContent = `Word: ${word}`;
   keystrokePopup.style.display = "block";

   // Nach 2 Sekunden das Fenster ausblenden
   setTimeout(() => {
      keystrokePopup.style.display = "none";
   }, 1800);
}

// Globales Keydown-Event erweitern
window.addEventListener("keydown", (e) => {
   if (!activeSounds.default) return;

   // Ignoriere Sondertasten wie Shift, Ctrl, etc.
   if (e.key.length === 1) {
      currentWord += e.key; // Zeichen zum aktuellen Wort hinzufügen
   } else if (e.key === "Backspace") {
      currentWord = currentWord.slice(0, -1); // Letztes Zeichen entfernen
   } else if (e.key === "Enter") {
      currentWord = ""; // Wort zurücksetzen
   }

   // Zeige das aktuelle Wort im Mini-Fenster
   showKeystrokePopup(currentWord);

   // Spiele den passenden Sound ab
   const soundKey = getSoundKeyForEvent(e);
   const audio = activeSounds[soundKey] || activeSounds.default;
   const clone = audio.cloneNode();
   clone.play();
});