function* cartesian(gen1, gen2) {
    let ls = collect(gen2);
    for (let i of gen1) {
        for (let j of ls) {
            yield [i,j];
        }
    }
}

function* range(from, to) {
    for (let i = from; i < to; i++) {
        yield i;
    }
}

function* exclude(ls) {
    for (let e of range(1,10)) {
        if (ls.indexOf(e) === -1) {
            yield e;
        }
    }
}



function* square(i,j) {
    let ix_i = getIx(i);
    let ix_j = getIx(j);
    for (let [i_alt, j_alt] of cartesian(ix_i, ix_j)) {
        yield [i+i_alt, j+j_alt];
    }

    function getIx(ix) {
        switch (ix % 3) {
            case 0: return [0,1,2];
            case 1: return [-1,0,1];
            case 2: return [-2,-1,0];
        }
    }
}



function getRow(board, i) {
    return board[i];
}

function getColumn(board, j) {
    let res = [];
    for (let e of range(0,9)) {
        res.push(board[e][j]);
    }
    return res;
}

function getSquare(board, i, j) {
    return collect(square(i, j), ([i_alt, j_alt]) => board[i_alt][j_alt]);
}

function* getCandidates(board, i, j) {
    const row = getRow(board, i);
    const cmn = getColumn(board, j);
    const sqr = getSquare(board, i, j);

    for (let e of exclude(union(row,cmn,sqr))) {
        yield e;
    }
}

function getOpenSquares(board) {
    return collect(filter(cartesian(range(0,9), range(0,9)), ([i,j]) => board[i][j] === 0));
}

export function validMove(board, i, j, value) {
    const row = getSquare(board, i, j);
    const cmn = getRow(board, i);
    const sqr = getColumn(board, j);
    return union(row, cmn, sqr).indexOf(value) === -1;
}


export function solver(board) {
    let squares = getOpenSquares(board);
    function solver_1(ix) {
        if (ix >= squares.length) {
            return true;
        }
        const square = squares[ix];
        const i = square[0];
        const j = square[1];
        for (let cand of getCandidates(board, i, j)) {
            board[i][j] = cand;
            if (solver_1(ix+1)) {
                return true;
            }
            board[i][j] = 0;
        }
        return false;
    }

    return solver_1(0);
}

// util
function printGen(gen) {
    for (let e of gen) {
        console.log(e);
    }
}

function* filter(gen, p) {
    for (let e of gen) {
        if (p(e)) {
            yield e;
        }
    }
}

function collect(gen, f = a => a) {
    let res = [];
    for (let e of gen) {
        res.push(f(e));
    }
    return res;
}

function union(...ls) {
    let res = [];
    for (let l of ls) { res = res.concat(l); }
    return res;
}

function printBoard(board) {
    let output = "";
    const rowLine = "------------+-----------+------------\n";
    for (let i = 0; i < board.length; i++) {
        const row = board[i];
        let outputRow = "|";
        for (let s of row) {
            outputRow += ` ${s} |`
        }
        if (i % 3 === 0) {
            output += rowLine;
        }
        output += outputRow + '\n';

    }
    output += rowLine;
    console.log(output);
}

