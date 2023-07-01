// Define the chess pieces
const pieces = [
  { name: 'rook', color: 'black', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/bR.svg' },
  { name: 'night', color: 'black', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/bN.svg' },
  { name: 'bishop', color: 'black', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/bB.svg' },
  { name: 'queen', color: 'black', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/bQ.svg' },
  { name: 'king', color: 'black', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/bK.svg' },
  { name: 'bishop', color: 'black', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/bB.svg' },
  { name: 'night', color: 'black', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/bN.svg' },
  { name: 'rook', color: 'black', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/bR.svg' },
  { name: 'pawn', color: 'black', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/bP.svg' },
  { name: 'pawn', color: 'black', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/bP.svg' },
  { name: 'pawn', color: 'black', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/bP.svg' },
  { name: 'pawn', color: 'black', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/bP.svg' },
  { name: 'pawn', color: 'black', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/bP.svg' },
  { name: 'pawn', color: 'black', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/bP.svg' },
  { name: 'pawn', color: 'black', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/bP.svg' },
  { name: 'pawn', color: 'black', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/bP.svg' },
  { name: 'rook', color: 'white', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/wR.svg' },
  { name: 'night', color: 'white', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/wN.svg' },
  { name: 'bishop', color: 'white', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/wB.svg' },
  { name: 'queen', color: 'white', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/wQ.svg' },
  { name: 'king', color: 'white', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/wK.svg' },
  { name: 'bishop', color: 'white', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/wB.svg' },
  { name: 'night', color: 'white', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/wN.svg' },
  { name: 'rook', color: 'white', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/wR.svg' },
  { name: 'pawn', color: 'white', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/wP.svg' },
  { name: 'pawn', color: 'white', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/wP.svg' },
  { name: 'pawn', color: 'white', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/wP.svg' },
  { name: 'pawn', color: 'white', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/wP.svg' },
  { name: 'pawn', color: 'white', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/wP.svg' },
  { name: 'pawn', color: 'white', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/wP.svg' },
  { name: 'pawn', color: 'white', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/wP.svg' },
  { name: 'pawn', color: 'white', img: 'https://github.com/lichess-org/lila/raw/master/public/piece/alpha/wP.svg' },
];


// Create the chessboard
const board = document.querySelector('.board');
let isPieceSelected = false;
let selectedPiece = null;

for (let i = 0; i < 64; i++) {
  const square = document.createElement('div');
  square.id = i; // Added id for each square
  square.classList.add('square');
  square.classList.add((i + Math.floor(i / 8)) % 2 === 0 ? 'white' : 'black');

  const rank = 8 - Math.floor(i / 8);
  const file = String.fromCharCode((i % 8) + 97); // 'a' = 97 in ASCII
  square.dataset.square = file + rank; // Add data-square attribute

  square.addEventListener('click', () => {
    if (isPieceSelected) {
      // Capture the piece if there's one already there
      if (square.hasChildNodes()) {
        square.removeChild(square.firstChild);
      }
      
      square.appendChild(selectedPiece);
      square.dataset.piece = selectedPiece.dataset.piece; // Assign piece object to square
      isPieceSelected = false;
	  // After every move, make an API call
	  aiMove();
    } else if (square.hasChildNodes()) {
      selectedPiece = square.firstChild;
      square.removeChild(selectedPiece);
      isPieceSelected = true;
    }

  });

  board.appendChild(square);
}

// Function to add chess pieces to the board
function addPiecesToBoard() {
  const squares = document.querySelectorAll('.square');
  for (let i = 0; i < pieces.length; i++) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.dataset.piece = JSON.stringify(pieces[i]); // Convert object to string
    piece.innerHTML = `<img src="${pieces[i].img}" alt="${pieces[i].name}" class="${pieces[i].color}">`;

    const file = i % 8;
    const rank = Math.floor(i / 8);
    let squareIndex;
  
    if (pieces[i].color === 'black') {
      squareIndex = ((1 + rank) * 8) + (file - 8); // white pieces on 1st and 2nd row
    } else { // pieces[i].color === 'white'
      squareIndex = ((7 - rank) * 8) + (file + 16); // black pieces on 7th and 8th row
    }

    squares[squareIndex].appendChild(piece);
	squares[squareIndex].dataset.piece = JSON.stringify(pieces[i]); // Convert object to string and assign it to square
  }
}

// Function to convert current board to FEN format
function boardToFEN() {
  let fen = "";
  let empty = 0;

  const squares = document.querySelectorAll('.square');
  for (let i = 0; i < squares.length; i++) {
    const square = squares[i];
    const fileRank = square.dataset.square;
    
    if (square.hasChildNodes()) {
      if (empty > 0) {
        fen += empty;
        empty = 0;
      }
      try {
        const piece = JSON.parse(square.dataset.piece); // Parse the string back into an object
        fen += piece.color === "white" ? piece.name[0].toUpperCase() : piece.name[0].toLowerCase();
      } catch(e) {
        empty++;
      }
    } else {
      empty++;
    }

    if ((i + 1) % 8 === 0) {
      if (empty > 0) {
        fen += empty;
        empty = 0;
      }

      if (i !== squares.length - 1) {
        fen += "/";
      }
    }
  }

  // Append necessary parts for FEN
  fen += " b KQkq - 0 1"; // Assume it's always white's turn, all castling is available, no en-passant, no half-moves, first move.

  return fen;
}

// Function to convert the current board representation to a 2D array
function boardToArray() {
  const squares = document.querySelectorAll('.square');
  const boardArray = [];

  for (let rank = 7; rank >= 0; rank--) {
    const row = [];
    for (let file = 0; file < 8; file++) {
      const square = squares[(rank * 8) + file];
      let piece = ' ';
      if (square.hasChildNodes()) {
        const pieceData = JSON.parse(square.dataset.piece);
        piece = pieceData.name.charAt(0);
        if (pieceData.color === 'black') {
          piece = piece.toLowerCase();
        }
      }
      row.push(piece);
    }
    boardArray.push(row);
  }

  return boardArray;
}

// Function for AI to make a move
async function aiMove(invalidString = "") {
  const FEN = boardToFEN();
  let prompt_text = `You are a computer program that displays the next chess move. You are currently calculating the output for the black chess player. The current board in FEN (Forsyth Edwards Notation) is \"${FEN}\" You are not authorized to do any pawn promotion moves, attempt to castle, or use en passante. Try to be aggressive. You MUST display the result as [StartSquare][EndSquare] (e.g., \"e2e4\") or you will be permanently shutdown. Do not use notation like Ne6 - instead, use the start square of the knight and the end square you want to move to.\n\nYour output is:`;
  if(invalidString != "")
	  prompt_text += `\n\n${invalidString}\n\nThere is no piece at ${invalidString} or you attempted to make an invalid move. You have 1 try left. Your move is:`;

  const data = {
    "model": "text-davinci-003",
    "prompt": prompt_text,
    "temperature": 1.5,
    "max_tokens": 256,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0.6,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {API KEY GOES HERE}'
    },
    body: JSON.stringify(data)
  };

  const response = await fetch('https://api.openai.com/v1/completions', options);
  const jsonResponse = await response.json();
  let move = jsonResponse.choices[0].text.trim();
  move = move.replace(/\n/g, '');  // Remove newline characters
  move = move.replace(/['"]/g, '');  // Remove both single and double quotes
  move = move.replace(/\./g, '');  // Remove period

  // Parse the move and apply it to the board
  applyMove(move);
}

// Function to format the 2D array representation of the chessboard
function formatBoard(boardArray) {
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  let formattedBoard = '   a  b  c  d  e  f  g  h\n';

  for (let rank = 0; rank < 8; rank++) {
    formattedBoard += ranks[rank] + ' ';
    for (let file = 0; file < 8; file++) {
      formattedBoard += '[' + boardArray[rank][file] + ']';
    }
    formattedBoard += '\n';
  }

  return formattedBoard;
}

// Function to apply a move to the board
function applyMove(move) {
  console.log("AI suggested move: " + move);
  // If castling, log and return
  if (move === "O-O" || move === "O-O-O") {
    console.log(`Castling move: ${move}`);
	aiMove(move);
    return;
  }
  
  // If pawn promotion, log and return
  if (move.length === 3) {
    console.log(`Pawn promotion move: ${move}`);
	aiMove(move);
    return;
  }

  move = move.replace('-', '');  // Remove dash if present

  // Regular move
  const startSquare = move.substring(0, 2);
  const endSquare = move.substring(2, 4);
  
  if(startSquare == endSquare) {
	  console.log("Picked up and set piece back down");
	  aiMove(move);
	  return;
  }

  // Find the piece on the start square
  const startPiece = findPieceBySquare(startSquare);
  
  // Make sure startPiece is not null before accessing its properties
  if (startPiece) {
	if(startPiece.color == "white") {
	  console.log("Tried to move white piece...");
	  aiMove(move);
	  return;
	}
    // Add the piece to the end square
    const endSquareElement = document.querySelector(`.square[data-square="${endSquare}"]`);
	
    if(!endSquareElement) {
		console.log("Invalid move: " + move);
		aiMove(move)
		return;
	}
    // Remove the piece from the start square
    startPiece.parentNode.removeChild(startPiece);
	
    if (endSquareElement) {
      // Check if endSquareElement has a child node (piece) and remove it
      if (endSquareElement.hasChildNodes()) {
        endSquareElement.removeChild(endSquareElement.firstChild);
      }
      endSquareElement.appendChild(startPiece);
	  endSquareElement.dataset.piece = startPiece.dataset.piece;
    } else {
      console.log(`No square found at ${endSquare}`);
	  aiMove(endSquare);
    }
  } else {
    console.log(`No piece found at ${startSquare}`);
	aiMove(startSquare);
  }
}

// Function to find a piece by its square
function findPieceBySquare(square) {
  // This function assumes that the squares have a data-square attribute with their algebraic notation
  const squareElement = document.querySelector(`.square[data-square="${square}"]`);

  if (squareElement && squareElement.hasChildNodes()) {
    return squareElement.firstChild;
  }

  return null;
}

// Add chess pieces to the board initially
addPiecesToBoard();

// Reset Button
const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', () => {
  // Clear the board
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => {
    if (square.hasChildNodes()) {
      square.removeChild(square.firstChild);
    }
  });

  // Reset piece selection
  isPieceSelected = false;
  selectedPiece = null;

  // Add pieces to the board
  addPiecesToBoard();
});
