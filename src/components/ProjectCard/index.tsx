import * as React from 'react';

import { Project } from '@/pages';
import { Stack, Typography, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        backgroundColor: theme.palette.primary.main,
        boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.1)',
        padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
        gap: theme.spacing(28 / 8),
        '& a': {
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
        textDecoration: 'none',
        alignItems: 'flex-end',
        transform: 'scale(1)',
        transition: '.2s',
        '&:hover': {
            transform: 'scale(1.01)'
        }
    }
}));

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const styles = useStyles();
    const router = useRouter();

    const link = { ...(router.query || {}), preview: project.id };

    return (
        <Link href={{ pathname: '/', query: link }} passHref>
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
                    <Link href={{ pathname: '/', query: link }}>
                        Посмотреть
                    </Link>
                </Stack>
                <Typography color={'#ABABAB'} fontSize={'0.714rem'} fontStyle='italic'>
                    {
                        project.updated ?
                            `Обновлено: ${new Date(project.updated).toLocaleDateString()}`
                            : `Добавлено: ${new Date(project.created).toLocaleDateString()}`
                    }
                </Typography>
            </Stack>
        </Link>
    );
};

export default ProjectCard;