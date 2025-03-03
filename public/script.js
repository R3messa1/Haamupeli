let BOARD_SIZE = 15 //Pelikentän koko
let board; //Kenttä tallennetaan tähän

// Haetaan nappi ja lisätään tapahtumankuuntelija
document.getElementById('new-game-btn').addEventListener('click', startGame);

//Luodaan apufunktio joka hakee tietyn ruudun sisällön pelilaudasta
function getCell(board, x, y) {
    return board[y][x]; //Palautetaan koordinaattien (x, y) kohdalla oleva arvo
}

function startGame(){
    // Piilotetaan intro-näkymä ja näytetään pelialue
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';

    board = generateRandomBoard(); //Luo pelikenttä ja piirrä se

    drawBoard(board); // Piirretään pelikenttä HTML:n

    console.log('Peli aloitettu');
}

function generateRandomBoard(){
    // Luodaan 2D-taulukko, joka täytetään tyhjillä soluilla (' ')
    const newBoard = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(''));

    // Käydään läpi pelikentän jokainen rivi
    for ( let y = 0; y < BOARD_SIZE; y++){
        // Käydään läpi jokainen sarake kyseisellä rivillä
        for (let x = 0; x < BOARD_SIZE; x++){
            // Tarkistetaan, onko solu pelikentän reunassa
            if (y === 0 || y === BOARD_SIZE - 1 || x === 0 || x === BOARD_SIZE - 1) { 
                newBoard[y][x] = 'W'; // Jos solu on reunassa, merkitään se seinäksi ('W')
            }
        }
    }

    console.log(newBoard);
    return newBoard;
}

//Tämä funktio piirtää pelikentän
function drawBoard(board) {
    //Haetaan HTML-elementti, johon pelikenttä lisätään
    const gameBoard = document.getElementById('game-board'); 
    // Asetetaan sarakkeet ja rivit pelikentän koon mukaisesti
    gameBoard.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 1fr)`;

    for (let y = 0; y < BOARD_SIZE; y++) { // Käydään läpi pelikentän rivit
        for (let x = 0; x < BOARD_SIZE; x++) { // Käydään läpi jokaisen rivin sarakkeet
            const cell = document.createElement('div'); // Luodaan uusi HTML-elementti (div), joka edustaa yhtä pelikentän ruutua
            cell.classList.add('cell'); // Lisätään ruudulle perusluokka "cell", joka muotoilee ruudun CSS:llä

            if (getCell(board, x, y) === 'W') {
                cell.classList.add('wall');
            }
            gameBoard.appendChild(cell);
        }
    }
}