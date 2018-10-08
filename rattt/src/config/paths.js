const prefix = '';

const paths = {
    index: prefix + '/',
    main: prefix + '/main',
    tradicional: prefix + '/ttt',
    nf: prefix + '/404'
};

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