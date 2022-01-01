<script>
    import { solver, validMove } from './solver.js';
    let value = 1;

    function setValue(ev) {
        value = helper();
        function helper() {
            switch(ev.key) {
                case '0': return 0;
                case '1': return 1;
                case '2': return 2;
                case '3': return 3;
                case '4': return 4;
                case '5': return 5;
                case '6': return 6;
                case '7': return 7;
                case '8': return 8;
                case '9': return 9;
            }
        }
    }

    let board = emptyBoard();

    function showNum(num) {
        if (num === 0) {
            return "";
        } else {
            return num.toString();
        }
    }

    function setNum(i,j) {
        if (value === 0 || validMove(board, i, j, value)) {
            board[i][j] = value;
        } 
    }

    function solve() {
        if (solver(board)) {
            board = board; // svelte hack 
        } else {
            alert("Board is unsolvable");
        }
    }

    function emptyBoard() {
        return [
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]
        ];
    }

    function reset() {
        board = emptyBoard();
    }

</script>
<style>
    :root {
        --dark: #523A28; 
        --soft: #E4D4C8;
        --tan: #D0B49F;
        --text: #333;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height: 100%;
    }

    h1 {
        color: var(--text);
    }

    button {
        margin-top: 1rem;
    }

    #board {
        display: grid;
        grid-template-rows: repeat(9, 1fr);
        grid-template-columns: repeat(9, 1fr);

        width: 50vh;
        height: 50vh;
    }

    .square {
        border: 1px solid var(--dark);

        background-color: var(--soft);

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 2rem;
        font-family: monospace;
    }

    .square:hover {
        background-color: var(--tan);
    }

    .square:nth-child(3n+0) {
        border-right: 3px solid var(--dark);
    }
    .square:nth-child(9n+0) {
        border-right: 1px solid var(--dark);
    }
    

    .square:nth-child(n+19):nth-child(-n+27),
    .square:nth-child(n+46):nth-child(-n+54) {
        border-bottom: 3px solid var(--dark);
    }
    
</style>
<svelte:window on:keydown={setValue} />

<div class="container">
    <h1>Press any square to {value === 0 ? "erase" : "add " + value}</h1>
    <div id="board">
        {#each board as row, i}
            {#each row as square, j}
            <div class="square" on:click={() => setNum(i,j)}>{showNum(square)}</div>
            {/each}
        {/each}
    </div>
    <div class="controls">
        <button on:click={solve}>Solve</button>
        <button on:click={reset}>Reset</button>
    </div>
</div>