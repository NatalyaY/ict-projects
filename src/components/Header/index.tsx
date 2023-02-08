import { Category } from '@/pages';
import * as React from 'react';
import { useRouter } from 'next/router';

import { Theme, Typography, Stack, Button } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    button: {
        padding: '11px 10px',
        border: '1px solid',
        borderRadius: 0,
        color: theme.palette.text.contrast,
        '&:hover': {
            backgroundColor: theme.palette.text.contrast + '60'
        },
    },
    ['button--active']: {
        backgroundColor: theme.palette.text.contrast,
        color: theme.palette.text.primary,
        '&:hover': {
            backgroundColor: theme.palette.text.contrast + 'cc'
        },
    },
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

    return (
        <Stack gap={24 / 8} component='header' >
            <Typography color={'text.contrast'} variant='h1'>
                Заголовок
                <Typography component='span' variant='h2' color='text.accent'>{` (${qty})`}</Typography>
            </Typography>
            <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
                {
                    categories.map(cat =>
                        <Button
                            key={cat.name}
                            className={cat.isActive ? styles['button--active'] + ' ' + styles.button : styles.button}
                            onClick={() => router.push(`${getCategoryParams(cat.name)}`)}
                        >
                            {cat.name}
                        </Button>
                    )
                }
            </Stack>
        </Stack>
    );
};

export default Header;
