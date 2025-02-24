// Haetaan nappi ja lisätään tapahtumankuuntelija
document.getElementById('new-game-btn').addEventListener('click', startGame);

function startGame(){
    // Piilotetaan intro-näkymä ja näytetään pelialue
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';

    console.log('Peli aloitettu');
}