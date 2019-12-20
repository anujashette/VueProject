let readline = require('readline-sync');

class TicTacToe {
    constructor() {
        this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.player = 'X';
        this.computer = 'Y';
        this.switchLetter = false;
        this.traverseCount = 0;
        this.userInput = '';
        this.exit = '',
            this.currentPlayer = ''
    }

    start() {
        readline.question('Press Enter to start game ===>');
        do {
            ticTacObj.resetBoard();
            ticTacObj.letterAssignToPlayer();
            ticTacObj.gameToss();
            ticTacObj.displayBoard();
            do {
                if (this.currentPlayer === 'player') {
                    console.log('Current player=============>', this.currentPlayer, `[${this.player}]`);
                    this.currentPlayer = 'computer';
                    this.userInput = readline.question('Enter cell number from 1 to 9 ===>');
                    ticTacObj.selectCell(this.player);
                }
                else if (this.currentPlayer === 'computer') {
                    console.log('Current player=============>', this.currentPlayer, `[${this.computer}]`);
                    this.userInput = ticTacObj.computerTurn();
                    this.currentPlayer = 'player';
                    ticTacObj.selectCell(this.computer);
                }

            } while (this.traverseCount < 9);
            this.exit = readline.question('Want to countinue... Enter Y/n ===>');
            if (this.exit !== 'n')
                this.letterAssignToPlayer();
        } while (this.exit !== 'n')
    }

    resetBoard() {
        this.traverseCount = 0;
        this.board.map((value, index) => {
            this.board[index] = 0;
        });
    }

    letterAssignToPlayer() {
        if (this.switchLetter) {
            this.player = 'Y';
            this.computer = 'X';
        }
        this.switchLetter = !this.switchLetter;
    }

    gameToss() {
        let randomNo = Math.random();
        if (randomNo < 0.5) {
            console.log('First turn of player as=======>' + this.player);
            this.currentPlayer = 'player';
        }
        else {
            console.log('First turn of computer as=======>' + this.computer);
            this.currentPlayer = 'computer';
        }
    }

    displayBoard() {
        console.log('  -------------------  ');
        console.log('  |  ' + this.board[0] + '  |  ' + this.board[1] + '  |  ' + this.board[2] + '  |');
        console.log('  -------------------  ');
        console.log('  |  ' + this.board[3] + '  |  ' + this.board[4] + '  |  ' + this.board[5] + '  |');
        console.log('  -------------------  ');
        console.log('  |  ' + this.board[6] + '  |  ' + this.board[7] + '  |  ' + this.board[8] + '  |');
        console.log('  -------------------  ');
    }

    selectCell(letter) {
        // this.userInput = readline.question('Enter cell number from 1 to 9 ===>');

        if (this.userInput !== '' && !isNaN(parseInt(this.userInput - 1)) && this.board[parseInt(this.userInput - 1)] === 0) {

            this.traverseCount += 1;
            this.board[parseInt(this.userInput - 1)] = letter;

            ticTacObj.displayBoard();
            ticTacObj.checkWinner(letter);

            return 0;
        }
        console.log('Enter valid number');
    }

    checkWinner(letter) {
        if (ticTacObj.checkRow() || ticTacObj.checkColumn() || ticTacObj.checkDiagonal()) {
            if (this.currentPlayer === 'computer') {
                this.currentPlayer = 'player';
            } else {
                this.currentPlayer = 'computer';
            }
            console.log('\n\n$$$$$$$$$$$$$    $$$$$$$$$$$$$$$$$         Winner is ', this.currentPlayer, `[${letter}]        $$$$$$$$$$$$$$$$$    $$$$$$$$$$$$$\n\n`);
            this.traverseCount = 9;
        }
        else if (this.traverseCount === 9) {
            console.log('\n\n ###################    ###################        Match is tied        ###################    ###################\n\n');
        }
    }

    checkRow() {
        for (let cell = 0; cell < 9; cell += 3) {
            if (this.board[cell] !== 0 && this.board[cell] === this.board[cell + 1] && this.board[cell] === this.board[cell + 2]) {
                return true;
            }
        }
        return false;
    }

    checkColumn() {
        for (let cell = 0; cell < 3; cell++) {
            if (this.board[cell] !== 0 && this.board[cell] === this.board[cell + 3] && this.board[cell] === this.board[cell + 6]) {
                return true;

            }
        }
        return false;
    }

    checkDiagonal() {
        for (let cell = 0; cell < 3; cell += 2) {
            if (cell === 0) {
                if (this.board[cell] !== 0 && this.board[cell] === this.board[cell + 4] && this.board[cell] === this.board[cell + 8]) {
                    return true;
                }
            }
            else if (cell === 2) {
                if (this.board[cell] !== 0 && this.board[cell] === this.board[cell + 2] && this.board[cell] === this.board[cell + 4]) {
                    return true;
                }
            }
        }
        return false;
    }

    computerTurn() {
        return ticTacObj.checkWinOrBlock()
    }

    checkCenterAndCorners() {
        // console.log('checkCenterAndCorners', this.board[4] === 0, this.board);

        if (this.board[4] === 0) {
            return 5;
        }
        else if (this.board[0] === 0) {
            return 1;
        }
        else if (this.board[2] === 0) {
            return 3;
        }
        else if (this.board[6] === 0) {
            return 7;
        }
        else if (this.board[8] === 0) {
            return 9;
        }
        else if (this.board[1] === 0) {
            return 2;
        }
        else if (this.board[3] === 0) {
            return 4;
        }
        else if (this.board[5] === 0) {
            return 6;
        }
        else if (this.board[7] === 0) {
            return 8;
        }
    }

    checkWinOrBlockRow() {

        for (let cell = 0; cell < 3; cell += 3) {
            if (this.board[cell] !== 0 && this.board[cell] === this.board[cell + 1]) {
                return cell + 2;
            }

            else if (this.board[cell + 1] !== 0 && this.board[cell + 1] === this.board[cell + 2]) {
                return cell;
            }

            else if (this.board[cell] !== 0 && this.board[cell] === this.board[cell + 2]) {
                return cell + 1;
            }

            else {
                return ticTacObj.checkCenterAndCorners();
            }
        }
    }

    checkWinOrBlockColumn() {

        for (let cell = 0; cell < 3; cell++) {
            console.log('column');

            if (this.board[cell] !== 0 && this.board[cell] === this.board[cell + 3]) {
                return cell + 6;
            }

            else if (this.board[cell + 3] !== 0 && this.board[cell + 3] === this.board[cell + 6]) {
                return cell;
            }

            else if (this.board[cell] !== 0 && this.board[cell] === this.board[cell + 6]) {
                return cell + 3;
            }

            else {
                return ticTacObj.checkCenterAndCorners();
            }
        }
    }

    checkWinOrBlockDiagonal() {

        for (let cell = 0; cell < 3; cell += 2) {
            if (this.board[cell] !== 0 && this.board[cell] === this.board[cell + 4]) {
                return cell + 8;
            }

            else if (this.board[cell + 4] !== 0 && this.board[cell + 4] === this.board[cell + 8]) {
                return cell;
            }

            else if (this.board[cell] !== 0 && this.board[cell] === this.board[cell + 8]) {
                return cell + 4;

            }

            else {
                return ticTacObj.checkCenterAndCorners();
            }
        }
    }
}

let ticTacObj = new TicTacToe();
ticTacObj.start();
