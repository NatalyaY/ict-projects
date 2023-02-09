import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Breakpoints {
        s: number;
    }
    interface TypeText {
        accent: string;
        accentLight: string;
        contrast: string;
        contrastLight: string;
        dark: string;
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#E5E5E5',
        },
        secondary: {
            main: '#2B8580',

        },
        background: {
            paper: '#303030',
        },
        text: {
            primary: '#303030',
            secondary: '#888888',
            accent: '#2B8580',
            accentLight: '#A5DEDB',
            contrast: '#FFFFFF',
            contrastLight: '#E5E5E5',
            dark: '#000000'
        },
    },
    components: {
        MuiTypography: {
            defaultProps: {
                color: 'text.primary'
            }
        },
    },
    typography: {
        fontFamily: '',
    }
});

theme.breakpoints = { ...theme.breakpoints, s: 768 };

theme.typography = {
    ...theme.typography,
    h1: {
        ...theme.typography.h1,
        fontSize: '2rem',
        fontWeight: 700,
        [theme.breakpoints.up('md')]: {
            fontSize: '2.571rem', // 36px
        },
    },
    h2: {
        ...theme.typography.h2,
        fontSize: '1.75rem',
        fontWeight: 700,
        [theme.breakpoints.up('md')]: {
            fontSize: '2rem', //28px
        },
    },
    h3: {
        ...theme.typography.h3,
        fontWeight: 700,
        fontSize: '1.1rem',
        [theme.breakpoints.up('md')]: {
            fontSize: '1.285rem', //18px
        },
    },
    h4: {
        ...theme.typography.h4,
        fontWeight: 700,
        fontSize: '1rem',
        [theme.breakpoints.up('md')]: {
            fontSize: '1.143rem', //16px
        },
    },
    subtitle1: {
        ...theme.typography.subtitle1,
        fontWeight: 700,
        fontSize: '1.57rem', //22px
    },
    button: {
        ...theme.typography.button,
        fontSize: '1rem',
        fontWeight: 700,
    },
    body1: {
        ...theme.typography.body1,
        fontSize: '1rem',
    },
};

export default theme;