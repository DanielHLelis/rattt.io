import paths from 'config/paths'
import generateLocal from 'utils/generateLocal'

import GameHandler from 'components/GameHandler'

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
            possiblePlayers: ['Local', 'Brandom', 'Greed']
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