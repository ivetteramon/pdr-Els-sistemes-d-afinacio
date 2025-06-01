import { autoCorrelate } from "./audio/pitchDetector.js";
import { getNoteInfo } from "./utils/notes.js";
import { updateUI } from "./ui/indicator.js";

const noteDisplay = document.getElementById("note");
const freqDisplay = document.getElementById("freq");
const indicadorAfinador = document.getElementById("indicadorAfinador");

window.startTuner = function () {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);

      const buffer = new Float32Array(analyser.fftSize);

      function detectPitch() {
        analyser.getFloatTimeDomainData(buffer);
        const frequency = autoCorrelate(buffer, audioContext.sampleRate);
        if (frequency !== -1) {
          const noteInfo = getNoteInfo(frequency);
          noteDisplay.textContent = noteInfo.note;
          freqDisplay.textContent = frequency.toFixed(2) + " Hz";
          updateUI(noteInfo, indicadorAfinador);
        }
        requestAnimationFrame(detectPitch);
      }

      detectPitch();
    })
    .catch(err => {
      alert("No s'ha pogut accedir al micròfon. Comprova els permisos.");
      console.error(err);
    });
}
