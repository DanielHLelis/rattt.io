const prefix = '';

const paths = {
    index: prefix + '/',
    main: prefix + '/index',
    void: prefix + '/void',
    credits: prefix + '/credits',
    tradicional: prefix + '/classic',
    playCustom: prefix + '/custom/play',
    createCustom: prefix + '/custom/create',
    gameCustom: prefix + '/custom/game',
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