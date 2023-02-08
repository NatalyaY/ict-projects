import React from 'react';
import Link, { LinkProps } from 'next/link';
import { createTheme } from '@mui/material/styles';
import { LinkProps as MUILinkProps } from '@mui/material/Link';


const LinkBehavior = React.forwardRef<
    HTMLAnchorElement,
    LinkProps
>((props, ref) => {
    return <Link ref={ref} {...props} />;
});

LinkBehavior.displayName = 'NextLink';

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
        MuiLink: {
            defaultProps: {
                component: LinkBehavior,
                color: 'inherit',
                underline: 'none',
            } as MUILinkProps,
            styleOverrides: {
                root: ({
                    '&:hover': {
                        opacity: 0.8,
                    },
                }),
            },
        },
        MuiTypography: {
            defaultProps: {
                color: 'text.primary'
            }
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior,
            },
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
            fontSize: '2.57rem', // 32px
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
        fontSize: '1.3rem', //18px
    },
    h4: {
        ...theme.typography.h4,
        fontWeight: 700,
        fontSize: '1.15rem', //16px
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