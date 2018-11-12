import symbolsList from 'config/symbols'

function getSymbols(){
    let symbols = [];

    for(let key in symbolsList){
        symbols.push(key);
    }

    return symbols;
}

export default function (players = 2, symbols = getSymbols()){
    let res = [];

    for(let i = 1; i <= players; i++){
        let pos = Math.floor(Math.random()*(symbols.length-1));
        res.push({
            _id: new Date().getTime().toString(36) + 'xxxxxxxxxx'.replace(/x/g, () => Math.floor(Math.random()*36).toString(36)),
            name: `Jogador ${i}`,
            symbol: symbols.splice(pos, 1)[0],
            type: 'local',
            playing: true,
            me: true
        })
    }

    return res;
}