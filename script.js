function zeigeSeite(nr) {
  const alleSeiten = document.querySelectorAll('.content');
  alleSeiten.forEach(seite => {
    seite.style.display = 'none';
  });
  document.getElementById('seite' + nr).style.display = 'block';

  // Hintergrundklasse
  if (nr >= 2 && nr < 5) {
    document.body.classList.add('theme-seite2');
  } else {
    document.body.classList.remove('theme-seite2');
  }

  // 👉 timerContainer einmal definieren
  const timerContainer = document.getElementById('timer-container');

  if (nr === 2) {
    timerContainer.style.display = 'block';

    const display = document.getElementById('time');
    if (!countdown) {
      const fiveMinutes = 60 * 5;
      startTimer(fiveMinutes, display);
    }
  }

  // ⛔ Auf Seite 5 Timer ausblenden
  if (nr === 5) {
    timerContainer.style.display = 'none';
  }
}

let countdown;

function startTimer(duration, display) {
  let timer = duration;
  const bar = document.getElementById('timer-bar');
  const total = duration;

  countdown = setInterval(function () {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    display.textContent =
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Fortschrittsbalken anpassen
    const percent = (timer / total) * 100;
    bar.style.width = percent + '%';

    // Farbwechsel bei weniger als 60 Sekunden
    if (timer <= 60) {
      //bar.style.backgroundColor = 'orange';
      display.style.color = 'orange';
    }

    // Noch weniger als 30 Sekunden → rot und blinkend
    if (timer <= 30) {
      //bar.style.backgroundColor = 'red';
      display.style.color = 'red';
      //dis
      //play.style.animation = 'blink 1s step-start infinite';
    }

    if (--timer < 0) {
      clearInterval(countdown);
      display.textContent = "Zeit abgelaufen!";

    }
  }, 1000);
}

document.querySelectorAll('.otp-input').forEach((input, index, inputs) => {
  input.addEventListener('input', () => {
    const value = input.value;
    if (value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
      if (input.value === '' && index > 0) {
        inputs[index - 1].focus();
      }
    }
  });

  input.addEventListener('paste', (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text').replace(/\s+/g, '');
    if (/^\d+$/.test(pasteData)) {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = pasteData[i] || '';
      }
      inputs[Math.min(pasteData.length, inputs.length - 1)].focus();
    }
  });
});

function prüfeCode() {
  const inputs = document.querySelectorAll('.otp-input');
  const code = Array.from(inputs).map(i => i.value.trim()).join('').toLowerCase();
  const feedback = document.getElementById('feedback');

  if (code.length !== 12) {
    feedback.textContent = "⚠️ Bitte alle 12 Felder ausfüllen!";
    feedback.className = "feedback show";
  
    setTimeout(() => {
      feedback.className = "feedback hide";
    }, 2000);
  } else if (!/^[0-9a-f]{12}$/i.test(code)) {
    feedback.textContent = "⚠️ Ungültige Zeichen – nur 0–9 und A–F erlaubt!";
    feedback.className = "feedback show";
  
    setTimeout(() => {
      feedback.className = "feedback hide";
    }, 2000);
  } else {
    const zielMac = "b827ebd3222c".toLowerCase();
    if (code.toLowerCase() === zielMac) {
      clearInterval(countdown);
      document.getElementById('weiterBtn').disabled = false;
      feedback.textContent = "✅ Korrekt!";
      feedback.className = "feedback show";
    } else {
      feedback.textContent = "❌ Falsche MAC-Adresse";
      feedback.className = "feedback show";
  
      setTimeout(() => {
        feedback.className = "feedback hide";
      }, 2000);
    }
  }
}

function versucheFensterZuSchließen() {
  window.close();

  // Falls blockiert:
  setTimeout(() => {
    alert("🛑 Dein Browser blockiert das automatische Schließen.\nBitte schließe das Fenster manuell.");
  }, 200);
}
