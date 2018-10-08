const prefix = '';

const paths = {
    index: prefix + '/',
    main: prefix + '/main',
    tradicional: prefix + '/ttt',
    nf: prefix + '/404'
};

export const LeftNavData = [
    {
        label: 'Intro',
        href: paths.index,
        onClick: (e) => {
            window.localStorage.setItem('firstEnter', 'true');
        }
    },
    {
        label: "3x3",
        href: paths.tradicional
    },
]

export const RightNavData = [
    {
        label: 'Log-in',
        href: null,
        onClick: (e) => {
            window.ratttAlert('Ops!','Aparentemente nossos ratos comeram o fio do servido! Tente novamente mais tarde!')
        }
    },
    {
        label: 'Sign-up',
        href: null,
        onClick: (e) => {
            window.ratttAlert('Ops!','Aparentemente nossos ratos comeram o fio do servido! Tente novamente mais tarde!')
        }
    }
]

export default paths;