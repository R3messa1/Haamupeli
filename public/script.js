let BOARD_SIZE = 20 //Pelikentän koko
const cellSize = calculateCellSize(); // Lasketaan ruudun koko responsiivisesti
let board; //Kenttä tallennetaan tähän

// Haetaan nappi ja lisätään tapahtumankuuntelija
document.getElementById('new-game-btn').addEventListener('click', startGame);

//Luodaan apufunktio joka hakee tietyn ruudun sisällön pelilaudasta
function getCell(board, x, y) {
    return board[y][x]; //Palautetaan koordinaattien (x, y) kohdalla oleva arvo
}

function calculateCellSize(){
    // Selvitetään selainikkunan leveys ja korkeus ja valitaan näistä pienempi arvo
    const screenSize = Math.min(window.innerWidth, window.innerHeight);

    // Lasketaan pelilaudan koko että jää hieman reunatilaa
    const gameBoardSize = 0.95 * screenSize;
    // Lasketaan yksittäisen ruudun koko jakamalla pelilaudan koko ruutujen määrällä
    return gameBoardSize / BOARD_SIZE;
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
            // Asetetaan ruudun leveys ja korkeus dynaamisesti laskettuun kokoon, lisätään yksikkö "px"
            cell.style.width = cellSize + "px"
            cell.style.height = cellSize + "px"

            if (getCell(board, x, y) === 'W') {
                cell.classList.add('wall');
            }
            gameBoard.appendChild(cell);
        }
    }
}

function generateObstacles(board){
 //Lista esteitä
    const obstacles = [
        [[0,0],[0,1],[1,0],[1,1]], // Square (neliö)
        [[0,0],[0,1],[0,2],[0,3]], // I-muoto (pysty- tai vaakasuora palkki)
        [[0,0],[1,0],[2,0],[1,1]], // T-muoto
        [[1,0],[2,0],[1,1],[0,2],[1,2]], // Z-muoto
        [[1,0],[2,0],[0,1],[1,1]], // S-muoto
        [[0,0],[1,0],[1,1],[1,2]], // L-muoto
        [[0,2],[0,1],[1,1],[2,1]]  // J-muoto (peilikuva L-muodosta)
    ];
    //Kovakoodatut aloituspaikat esteille pelikentällä
    const positions = [
        { startX: 2, startY: 2 },   // Este kentän vasemmassa yläkulmassa
        { startX: 8, startY: 2 },   // Este ylempänä keskellä
        { startX: 4, startY: 8 },   // Este vasemmalla keskialueella
        { startX: 3, startY: 16 },  // Este alareunan vasemmassa osassa
        { startX: 10, startY: 10 }, // Este keskellä kenttää
        { startX: 12, startY: 5 },  // Este yläkeskialueella
        { startX: 12, startY: 10 }, // Este keskialueella
        { startX: 16, startY: 10 }, // Este oikealla keskialueella
        { startX: 13, startY: 14 }  // Este alhaalla keskellä
    ];
     //Käydään läpi jokainen aloituspaikka ja lisätään sinne satunnainen este
     positions.forEach(pos => {
        // Valitaan satunnainen este obstacles-taulukosta
        const randomObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];

        //Sijoitetaan valittu este kentälle kyseiseen kohtaan
        placeObstacle(board, randomObstacle, pos.startX, pos.startY);
     });

}

function placeObstacle(board, obstacle, startX, startY){
    // Käydään läpi jokainen esteen määrittelemä ruutu
    for (coordinatePair of obstacle) {
        [x, y] = coordinatePair; //Puretaan koordinaattipari x- ja y-muuttujiin

        // Sijoitetaan esteen ruutu pelikentälle suhteessa aloituspisteeseen
        board[startY + y][startX + x] = 'W';
    }
}