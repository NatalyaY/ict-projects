import * as React from 'react';
import { Container, Theme, Stack, Dialog } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

import Head from 'next/head';
import { GetServerSideProps } from 'next';


import data from '../../public/data.json' assert { type: 'json' };
import Header from './../components/Header';
import Projects from '@/components/Projects';
import ProjectDetails from './../components/ProjectDetails/index';

export type Project = typeof data['data'][number];
export interface Category {
    name: string;
    isActive: boolean;
}
export type SelectedProject = typeof data['data'][number];

interface IProps {
    projects: Project[],
    categories: Category[],
    selectedProject: SelectedProject | null
}


const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
    },
    card: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '30px',
        padding: `${theme.spacing(35 / 8)} ${theme.spacing(60 / 8)} ${theme.spacing(60 / 8)}`,
        '@media (max-width:768px)': {
            padding: `${theme.spacing(20 / 8)}`,
        }
    },
    '@media (min-width: 768px)': {
        container: {
            padding: `${theme.spacing(90 / 8)} ${theme.spacing(60 / 8)}`,
        },
    },
}));


const Home: React.FC<IProps> = ({ projects, categories, selectedProject }) => {
    const styles = useStyles();
    const qty = projects.length;

    return (
        <>
            <Head>
                <title>ICT проекты</title>
                <meta name="description" content="Полный каталог проектов ICT" />
            </Head>
            <Container disableGutters maxWidth={'xl'} className={styles.container}>
                <Stack gap={40 / 8} className={styles.card}>
                    <Header categories={categories} qty={qty} />
                    <Projects projects={projects} />
                </Stack>
                {
                    selectedProject && <ProjectDetails selectedProject={selectedProject} />
                }
            </Container>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
    const { cat, preview } = context.query as { cat?: string, preview?: string };
    const selectedCategories = cat?.split(';');

    const projectsByCategories = data['data']
        .reduce((acc, project) => {
            acc[project.application] = [...(acc[project.application] || []), project] || [project];
            return acc;
        }, {} as { [k: string]: Project[] });

    const categories = Object.entries(projectsByCategories)
        .sort((a, b) => b[1].length - a[1].length)
        .map(entry => ({
            name: entry[0],
            isActive: selectedCategories ? selectedCategories.includes(entry[0]) : false,
        }));

    const projects = selectedCategories ?
        selectedCategories.map(cat => projectsByCategories[cat]).flat()
        : data['data'];

    const selectedProject = data['data'].find(project => project.id == preview) || null;

    return { props: { projects, categories, selectedProject } };
};

export default Home;
