const Players = [
    {
        label: "Minnie",
        value: "pro-bot"
    },
    {
        label: "Greed",
        value: "medium-bot"
    },
    {
        label: "Brandom",
        value: "random-bot"
    },
    {
        label: "Local",
        value: "local"
    }
];
export function findPlayer(value){
    let player = null;
    Players.forEach(el => {
        if(el.value === value) player = el;
    })
    return player;
};
export default Players;