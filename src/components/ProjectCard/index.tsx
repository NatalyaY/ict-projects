import * as React from 'react';

import { Project } from '@/pages';
import { Stack, Typography, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        flex: 1,
        padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
        gap: theme.spacing(28 / 8),
        justifyContent: 'space-between',
        backgroundColor: theme.palette.primary.main,
        boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.1)',
        '& > p': {
            color: theme.palette.text.accent,
            textTransform: 'uppercase',
            fontWeight: 700,
            textDecoration: 'none',
            '&:hover': {
                opacity: .5
            }
        }
    },
    wrapperLink: {
        height: '100%',
        textDecoration: 'none',
        boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.1)',
        overflowWrap: 'break-word',
        transform: 'scale(1)',
        willChange: 'transform',
        transition: 'transform .2s',
        '&:hover': {
            transform: 'scale(1.01)'
        },
    },
    date: {
        alignSelf: 'flex-end',
        color: '#ABABAB',
        fontSize: '0.857rem',
        fontStyle: 'italic',
    }
}));

const ProjectCard = React.forwardRef<HTMLAnchorElement, { project: Project }>(({ project }, ref) => {
    const styles = useStyles();
    const router = useRouter();

    const query = { ...(router.query || {}), preview: project.id };

    return (
        <Stack ref={ref} minWidth='0'>
            <Link href={{ pathname: '/', query }} scroll={false} passHref legacyBehavior>
                <Stack component={'a'} className={styles.wrapperLink}>
                    <Stack className={styles.card}>
                        <Stack gap={1}>
                            <Typography color={'text.secondary'} variant='h4'>
                                {
                                    project.city ?
                                        `${project.country}, ${project.city}`
                                        : project.country
                                }
                            </Typography>
                            <Typography variant='h3'>
                                {project.title}
                            </Typography>
                        </Stack>
                        <Typography>
                            Посмотреть
                        </Typography>
                    </Stack>
                    <Typography className={styles.date}>
                        {
                            project.updated ?
                                `Обновлено: ${new Date(project.updated).toLocaleDateString()}`
                                : `Добавлено: ${new Date(project.created).toLocaleDateString()}`
                        }
                    </Typography>
                </Stack>
            </Link>
        </Stack>
    );
});

ProjectCard.displayName = 'ProjectCard';

export default React.memo(ProjectCard);