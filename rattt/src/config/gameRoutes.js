import paths from 'config/paths'
import generateLocal from 'utils/generateLocal'

import GameHandler from 'components/GameHandler'

import CampanhaHandler from 'screens/CampanhaHandler'

const Routes = [
    {
        name: "Clássico",
        path: paths.tradicional,
        component: GameHandler,
        props: {
            players: generateLocal(2, ['X', 'O']),
            local: true,
            width: 3,
            height: 3,
            sequence: 3,
            gravity: false,
            disabled: [],
            possiblePlayers: ['Local', 'Minnie', 'Brandom', 'Greed']
        }
    },
    {
        name: "4x4",
        path: '/4x4',
        component: GameHandler,
        props: {
            players: generateLocal(2),
            local: true,
            width: 4,
            height: 4,
            sequence: 4,
            gravity: false,
            disabled: [],
            possiblePlayers: ['Local', 'Brandom', 'Greed']
        }
    },
    {
        name: "Gravitrips",
        path: '/gravitrips',
        component: GameHandler,
        props: {
            players: generateLocal(2),
            local: true,
            width: 7,
            height: 6,
            sequence: 4,
            gravity: true,
            disabled: [],
            possiblePlayers: ['Local', 'Brandom', 'Greed']
        }
    },
    {
        name: "Gravitom",
        path: '/gravitom',
        component: GameHandler,
        props: {
            players: generateLocal(4),
            local: true,
            width: 14,
            height: 12,
            sequence: 4,
            gravity: true,
            disabled: [],
            possiblePlayers: ['Local', 'Brandom']
        }
    },
    {
    name: "Losango",
    path: '/losango',
    component: GameHandler,
    props: {
        players: generateLocal(2, ['X', 'O']),
        local: true,
        width: 7,
        height: 7,
        sequence: 4,
        gravity: false,
        disabled: [0, 1, 2, 4, 5, 6,
            7, 8, 12, 13,
            14, 20,
            28, 34,
            35, 36, 40, 41,
            42, 43, 44, 46, 47, 48],
            possiblePlayers: ['Local', 'Brandom']
        }
    },
    {
        name: "Dez Passitos",
        path: '/dez',
        component: GameHandler,
        props: {
            players: generateLocal(2),
            local: true,
            width: 10,
            height: 10,
            sequence: 5,
            gravity: false,
            disabled: [],
            possiblePlayers: ['Local', 'Brandom']
        }
    },
    {
        name: "Big Party",
        path: '/big',
        component: GameHandler,
        props: {
            players: generateLocal(4),
            local: true,
            width: 12,
            height: 12,
            sequence: 4,
            gravity: false,
            disabled: [],
            possiblePlayers: ['Local', 'Brandom']
        }
    },
]
export default Routes;

export function modeExtractor(){
    let res = [];
    Routes.forEach((el) => {
        res.push({
            name: el.name,
            href: el.path
        })
    });
    return res;
}

export function campanhaExtractor(){
    let res = [];
    Campanha.forEach((el) => {
        res.push({
            name: el.name,
            href: el.path
        })
    });
    return res;
}

export const Campanha = [
    {
        _id: "joevms22jdp7qg2b5z",
        name: "Nível 1",
        path: '/campanha/1',
        component: CampanhaHandler,
        auth: true,
        requires: "",
        props: {
            players: [
                ...generateLocal(1, ['X']),
                {
                    _id: new Date().getTime().toString(36) + 'xxxxxxxxxx'.replace(/x/g, () => Math.floor(Math.random()*36).toString(36)),
                    name: `Brandom`,
                    symbol: 'O',
                    type: 'random-bot',
                    disabled: true,
                    playing: true,
                    me: false
                }
            ],
            local: true,
            width: 3,
            height: 3,
            sequence: 3,
            gravity: false,
            disabled: [],
            possiblePlayers: ['Local'],
            
        }
    },
    {
        _id: "joewxvk36mhx53ma1f",
        name: "Nível 2",
        path: '/campanha/2',
        component: CampanhaHandler,
        auth: false,
        requires: "joevms22jdp7qg2b5z",
        props: {
            players: [
                ...generateLocal(1, ['X']),
                {
                    _id: new Date().getTime().toString(36) + 'xxxxxxxxxx'.replace(/x/g, () => Math.floor(Math.random()*36).toString(36)),
                    name: `Brandom`,
                    symbol: 'O',
                    type: 'random-bot',
                    disabled: true,
                    playing: true,
                    me: false
                }
            ],
            local: true,
            width: 4,
            height: 4,
            sequence: 4,
            gravity: false,
            disabled: [],
            possiblePlayers: ['Local'],
            
        }
    },
    {
        _id: "joewy65anu1v3hgh7e",
        name: "Nível 3",
        path: '/campanha/3',
        component: CampanhaHandler,
        auth: false,
        requires: "joewxvk36mhx53ma1f",
        props: {
            players: [
                ...generateLocal(1, ['X']),
                {
                    _id: new Date().getTime().toString(36) + 'xxxxxxxxxx'.replace(/x/g, () => Math.floor(Math.random()*36).toString(36)),
                    name: `Brandom`,
                    symbol: 'O',
                    type: 'random-bot',
                    disabled: true,
                    playing: true,
                    me: false
                }
            ],
            local: true,
            width: 7,
            height: 6,
            sequence: 4,
            gravity: true,
            disabled: [],
            possiblePlayers: ['Local'],
            
        }
    },
    {
        _id: "joewyhypxe395y2ohh",
        name: "Nível 4",
        path: '/campanha/4',
        component: CampanhaHandler,
        auth: false,
        requires: "joewy65anu1v3hgh7e",
        props: {
            players: [
                ...generateLocal(1, ['X']),
                {
                    _id: new Date().getTime().toString(36) + 'xxxxxxxxxx'.replace(/x/g, () => Math.floor(Math.random()*36).toString(36)),
                    name: `Greed`,
                    symbol: 'O',
                    type: 'easy-bot',
                    disabled: true,
                    playing: true,
                    me: false
                }
            ],
            local: true,
            width: 3,
            height: 3,
            sequence: 3,
            gravity: false,
            disabled: [],
            possiblePlayers: ['Local'],
            
        }
    },
    {
        _id: "joewyq9l0pkcteki74",
        name: "Nível 5",
        path: '/campanha/5',
        component: CampanhaHandler,
        auth: false,
        requires: "joewyhypxe395y2ohh",
        props: {
            players: [
                ...generateLocal(1, ['X']),
                {
                    _id: new Date().getTime().toString(36) + 'xxxxxxxxxx'.replace(/x/g, () => Math.floor(Math.random()*36).toString(36)),
                    name: `Greed`,
                    symbol: 'O',
                    type: 'easy-bot',
                    disabled: true,
                    playing: true,
                    me: false
                }
            ],
            local: true,
            width: 4,
            height: 4,
            sequence: 4,
            gravity: false,
            disabled: [],
            possiblePlayers: ['Local'],
            
        }
    }
]