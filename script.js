function zeigeSeite(nr) {
    const alleSeiten = document.querySelectorAll('.content');
    alleSeiten.forEach(seite => {
      seite.style.display = 'none';
    });
    document.getElementById('seite' + nr).style.display = 'block';

    
  // Klasse für neuen Hintergrund ab Seite 2
  if (nr >= 2) {
    document.body.classList.add('theme-seite2');
  } else {
    document.body.classList.remove('theme-seite2');
  }
}
