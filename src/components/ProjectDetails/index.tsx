import React from 'react';
import { SelectedProject } from '@/pages';

import { Dialog, IconButton, Link, Stack, Typography, useMediaQuery, Theme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles, createStyles } from '@mui/styles';

import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) => {
    const px = {
        paddingLeft: theme.spacing(40 / 8),
        paddingRight: theme.spacing(40 / 8),
    };
    return createStyles({
        paper: {
            backgroundColor: theme.palette.primary.main,
            paddingTop: theme.spacing(40 / 8),
            paddingBottom: theme.spacing(40 / 8),
            borderRadius: 0,
            boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.15)',
            gap: theme.spacing(3)
        },
        header: {
            ...px,
            gap: theme.spacing(2),
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexDirection: 'row'
        },
        titleContainer: {
            ...px,
            gap: theme.spacing(10/8)
        },
        charactersContainer: {
            ...px,
            flexWrap: 'nowrap',
            flexDirection: 'row',
            paddingTop: theme.spacing(32 / 8),
            paddingBottom: theme.spacing(32 / 8),
            gap: theme.spacing(39 / 8),
            backgroundColor: theme.palette.secondary.main,
            '@media(max-width: 600px)': {
                flexWrap: 'wrap',
            }
        },
        descriptionContainer: {
            ...px,
            gap: theme.spacing(1)
        },
        application: {
            backgroundColor: theme.palette.secondary.main,
            padding: theme.spacing(10 / 8),
            fontWeight: 700,
            display: 'block',
            color: theme.palette.text.contrastLight
        },
        iconBtn: {
            color: theme.palette.text.dark,
            padding: 0,
            borderRadius: 0,
            '& svg': {
                fontSize: '27px'
            }
        },
        character: {
            color: theme.palette.text.contrast,
            gap: theme.spacing(1),
            flex: '0 1 231px'
        },
        characterItem: {
            color: 'inherit'
        },
        characterTitle: {
            color: 'inherit',
            textTransform: 'uppercase'
        }
    });}
);

const ProjectDetails: React.FC<{ selectedProject: SelectedProject }> = ({ selectedProject }) => {
    const router = useRouter();
    const styles = useStyles();
    const isMobile = useMediaQuery('(max-width:768px)');

    const { preview, ...query } = router.query;

    const handleClose = () => {
        router.push({ pathname: '/', query }, undefined, { scroll: false });
    };

    const characters = [
        { title: 'Объект внедрения' as const, item: selectedProject.object },
        { title: 'Применяемое решение' as const, item: selectedProject.solution },
        { title: 'Разработчик' as const, item: selectedProject.developer },
    ];

    return (
        <Dialog
            onClose={handleClose}
            open={Boolean(selectedProject)}
            maxWidth={'md'}
            fullScreen={isMobile}
            PaperProps={{ className: styles.paper }}
        >
            <Stack className={styles.header}>
                <Typography className={styles.application}>
                    {selectedProject.application}
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    className={styles.iconBtn}
                >
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Stack className={styles.titleContainer}>
                <Typography variant='subtitle1' color={'text.secondary'}>
                    {
                        selectedProject.city ?
                            `${selectedProject.country}, ${selectedProject.city}`
                            : selectedProject.country
                    }
                </Typography>
                <Typography variant='h2' color={'text.dark'}>
                    {selectedProject?.title}
                </Typography>
            </Stack>
            <Stack className={styles.charactersContainer}>
                {
                    characters.map(character =>
                        character.item &&
                        <Stack key={character.title} className={styles.character}>
                            <Typography variant='h4' className={styles.characterTitle}>
                                {character.title}
                            </Typography>
                            {
                                character.title == 'Применяемое решение' ?
                                    <Link
                                        href={character.item.url}
                                        className={styles.characterItem}
                                        target='_blank'
                                        underline='hover'
                                    >
                                        {character.item.description}
                                    </Link>
                                    :
                                    <Typography className={styles.characterItem}>
                                        {character.item}
                                    </Typography>
                            }
                        </Stack>
                    )
                }
            </Stack>
            <Stack className={styles.descriptionContainer} color={'text.dark'}>
                <Typography variant='h4' className={styles.characterTitle}>Описание</Typography>
                <Stack
                    className={styles.characterItem}
                    gap={2}
                    dangerouslySetInnerHTML={{ __html: selectedProject.description }}
                />
            </Stack>
        </Dialog>
    );
};

export default ProjectDetails;
