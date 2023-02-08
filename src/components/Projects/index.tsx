import * as React from 'react';
import { Project } from '@/pages';
import { Stack } from '@mui/material';
import ProjectCard from './../ProjectCard/index';

const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => {
    return (
        <Stack gap={70 / 8} component='main' >
            {
                projects.map(project => <ProjectCard key={project.id} project={project} />)
            }
        </Stack>
    );
};

export default Projects;