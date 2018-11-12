export default class Validator{
    options = [];

    constructor(props = {}){
        this.seq = props.seq || 3;
        this.width = props.width || 3;
        this.height = props.height || 3;
        this.matrix = props.matrix || [];
        this.gravity = props.gravity || false;
        this.players = props.players;

        this.options = this.generateAllOptions();
    }

    get solves(){
        return this.options;
    }

    apply = (pos, matrix = this.matrix) => {
        if(this.gravity){
            return this.gravitate(pos, matrix);
        }else return pos;
    }

    validOptions = (matrix) => {
        
        if(this.gravity){
            return this.blankGravity(matrix);
        }else return this.blankSpaces(matrix);
    }

    gravitate = (pos, matrix = this.matrix) => {
        let posy = Math.floor(pos / this.width), posx = pos % this.width, blank = this.blankSpaces(matrix);

        for(let i = this.height - 1; i >= posy; i--){ //Down Gravitate
            if(blank.includes(i*this.width + posx))return i*this.width + posx;
        }
        
        return null;
    }

    generateAllOptions = () =>{
        let {width, height, seq} = this, options = [];

        for(let y  = 0, pos = 0; y < height; y++){
            for(let x = 0; x < width; x++, pos++){

                if(x + seq <= width) options.push(this.linha(pos)); //Teste de linha
                if(y + seq <= height) options.push(this.coluna(pos)); //Teste de coluna
                if((x + seq <= width) && (y + seq <= height))options.push(this.diagonalDec(pos)); //Teste de diagonal decrescente
                if((x - seq + 1 >= 0) && (y + seq <= height))options.push(this.diagonalCre(pos)); //Teste de diagona crescente

            }
        }

        return options;
    }

    linha = (p) => {
        let {seq} = this, res = [];
        while(seq--)
            res.unshift(p + seq); //Calculo de ponto possível
        return res;
    }

    coluna = (p) => {
        let {seq, width} = this, res = [];

        while(seq--)
            res.unshift(p + seq * width); //Calculo de ponto possível
        return res;
    }

    diagonalDec = (p) => {
        let {seq, width} = this, res = [];

        while(seq--)
            res.unshift(p + seq * (width + 1)); //Calculo de ponto possível
        return res;
    }

    diagonalCre = (p) => {
        let {seq, width} = this, res = [];

        while(seq--)
            res.unshift(p + seq * (width - 1)); //Calculo de ponto possível
        return res;
    }

    blankSpaces = (matrix = this.matrix) => {
        let blank = [];
        for(let i = 0; i < matrix.length; i++){
            if(matrix[i] === null || matrix[i] === undefined)blank.push(i);
        }
        return blank;
    }

    blankGravity = (matrix = this.matrix) => {
        let blank = [];
        for(let i = 0; i < this.width; i++){
            for(let j = this.height - 1; j >= 0; j--){
                let pos = j*this.width + i;
                if(matrix[pos] === null || matrix[pos] === undefined){
                    blank.push(pos);
                    break;
                }
            }
        }
        return blank;
    }

    validate = (matrix = this.matrix) => {
        let blank = this.blankSpaces(matrix), // Espaços em branco
            gameState = { //Definição de retorno padrão do estado de jogo
                blankSpaces: blank.length,
                winner: undefined,
                finished: blank.length === 0 ? true : false,
            },
            {players, solves} = this;
        
        if(players.length === 1){
            gameState.winner = players[0];
            gameState.finished = true;
        }else
            players.forEach((el) => {
                let newMatrix = [];

                matrix.forEach((current, index) => { //Posições pertencentes ao el atual
                    if(current === el._id)
                        newMatrix.push(index)
                })
                
                for(let i = 0; i < solves.length; i++){
                    let winned = true;
                    
                    solves[i].every(el => (winned = newMatrix.includes(el))); //Verifica se as posições pertecentes ao jogador enquadram-se a um caso de vitória
                    if(winned){
                        gameState.winner = gameState.winner === undefined ? el : null;
                        gameState.finished = true;
                        break;
                    }
                }
            });

        return gameState;

    }





    //bots

    randomPlay = (matrix = this.matrix) =>{
        let blank = this.validOptions(matrix), factor = Math.floor(Math.random()*blank.length);
        return(blank[factor]);
    }

    gameScore = (gameState, id, depth = 0) => {
        if(gameState.winner === undefined || gameState.winner === null)
            return 0;
        if(gameState.winner._id === id)
            return 100 - depth;
        else
            return depth - 100;
    }

    minimax = (limit, botId, oponentId, matrix, botTurn = true, depth = 0) => { //Change from minimax to alpha - beta pruning
        
        let blankSpaces = this.validOptions(matrix),
            gameState = this.validate(matrix),
            results = [] ;
        
        if(gameState.finished)
            return {
                pos: null,
                score: this.gameScore(gameState, botId, depth)
            }
        
        if(limit && limit < depth)
            return {
                pos: null,
                score: 0
            }

        blankSpaces.forEach(el => {
            let newMatrix = Object.assign([], matrix);
            newMatrix[el] = botTurn ? botId : oponentId;
            results.push({
                pos: el,
                score: this.minimax(limit, botId, oponentId, newMatrix, !botTurn, depth + 1).score
            });
        });


        let base = results[0];
        for(let i = 1; i < results.length; i++){
            if(botTurn){
                if(results[i].score > base.score)
                    base = results[i];
            }else{
                if(results[i].score < base.score)
                    base = results[i];
            }
        }

        if(base.score === 0 && depth === 0 && limit <= 3){ //Improviso
            let all = results.filter(el => el.score === 0);

            return all[Math.floor(Math.random() * (all.length-1))]
        }

        return base;
    }

    proClassic = (matrix, botId, oponentId) => this.minimax(9, botId, oponentId, matrix)

    mediumClassic = (matrix, botId, oponentId) => this.minimax(4, botId, oponentId, matrix)

    easyClassic = (matrix) => this.randomPlay(matrix)

    medium4 = (matrix, botId, oponentId) => this.minimax(3, botId, oponentId, matrix)

    easy = (matrix, botId, oponentId) => this.minimax(2, botId, oponentId, matrix)

    botPlay = (botId, oponentId = -1, tipo = 'random-bot', matrix = this.matrix) => {

        switch(tipo){
            case 'random-bot':
                return this.randomPlay(matrix);
            case 'pro-bot':
                if(this.width <= 3 && this.height <=3)
                    return this.proClassic(matrix, botId, oponentId).pos;
                else
                    return this.randomPlay(matrix)
            case 'medium-bot':
                if(this.width <= 3 && this.height <=3)
                    return this.mediumClassic(matrix, botId, oponentId).pos;
                else
                    return this.medium4(matrix, botId, oponentId).pos;
            case 'easy-bot':
                return this.easy(matrix, botId, oponentId).pos;
            default:
                return this.randomPlay(matrix);
        }
    }
};