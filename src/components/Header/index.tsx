import { Category } from '@/pages';
import * as React from 'react';
import { useRouter } from 'next/router';

import { Theme, Typography, Stack, Button } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        gap: theme.spacing(64 / 8),
        flexDirection: 'row',
        '@media (max-width:768px)': {
            flexWrap: 'wrap',
        }
    },
    button: {
        wordBreak: 'keep-all',
        padding: '11px 10px',
        border: '1px solid',
        borderRadius: 0,
        color: theme.palette.text.contrast,
        '&:hover': {
            backgroundColor: theme.palette.text.contrast + '60'
        },
        '@media (max-width:400px)': {
            wordBreak: 'break-all',
        },
        '@media (max-width:768px)': {
            flex: '1 1 auto',
        }
    },
    ['button--active']: {
        backgroundColor: theme.palette.text.contrast,
        color: theme.palette.text.primary,
        '&:hover': {
            backgroundColor: theme.palette.text.contrast + 'cc'
        },
    },
    svgButton: {
        flex: '1 0 82px',
        maxWidth: 'fit-content',
        padding: 0,
        marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(6 / 8),
        color: theme.palette.text.contrast,
        fill: theme.palette.primary.main,
        '& svg': {
            transform: 'scale(1)',
            willChange: 'transform',
            transition: '.2s'
        },
        '&:hover': {
            fill: theme.palette.text.accentLight,
            color: theme.palette.text.accentLight,
            backgroundColor: 'transparent',
            '& svg': {
                transform: 'scale(1.05)'
            }
        }
    }
}));


const Header: React.FC<{ categories: Category[], qty: number }> = ({ categories, qty }) => {
    const router = useRouter();
    const styles = useStyles();

    const getCategoryParams = (newCategory: string) => {
        const selectedCategories = (router.query.cat as string | undefined)?.split(';');
        const startStr = '/?cat=';

        if (!selectedCategories) {
            return startStr + newCategory;
        } else if (selectedCategories.includes(newCategory)) {
            const filtered = selectedCategories.filter(c => c != newCategory);
            return filtered.length ? startStr + filtered.join(';') : '/';
        } else {
            return startStr + router.query.cat + ';' + newCategory;
        }
    };

    const resetCategories = () => {
        router.push('/');
    };

    return (
        <Stack gap={24 / 8} component='header' >
            <Typography color={'text.contrast'} variant='h1'>
                Список проектов
                <Typography component='span' variant='h2' color='text.accent'>{` (${qty})`}</Typography>
            </Typography>
            <Stack className={styles.container}>
                <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
                    {
                        categories.map(cat =>
                            <Button
                                key={cat.name}
                                className={cat.isActive ? styles['button--active'] + ' ' + styles.button : styles.button}
                                onClick={() => router.push(`${getCategoryParams(cat.name)}`, undefined, { scroll: false })}
                            >
                                {cat.name}
                            </Button>
                        )
                    }
                </Stack>
                <Button className={styles.svgButton} onClick={resetCategories}>
                    <svg width={54} height={52}>
                        <use xlinkHref="/filters.svg#filters" />
                    </svg>
                    <Typography variant='body2' color={'inherit'}>
                        сбросить все фильтры
                    </Typography>
                </Button>
            </Stack>
        </Stack>
    );
};

export default Header;
