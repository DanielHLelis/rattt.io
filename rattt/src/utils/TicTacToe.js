export default class Validator{
    options = [];

    constructor(props = {}){
        this.seq = props.seq || 3;
        this.width = props.width || 3;
        this.height = props.height || 3;
        this.matrix = props.matrix || [];

        this.options = this.generateAllOptions()
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

    blankSpaces(content){
        let blank = [], {matrix} = this;
        for(let i = 0; i < matrix.length; i++){
            if(matrix[i] === null || matrix[i] === undefined)blank.push(i);
        }
        return blank;
    }

    get solves(){
        return this.options;
    }
};