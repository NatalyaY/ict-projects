import React, { useState, useEffect } from 'react';

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

import { Project } from '@/pages';
import { Box, Button, Theme, useMediaQuery } from '@mui/material';

import ProjectCard from './../ProjectCard/index';
import { makeStyles, createStyles } from '@mui/styles';

import InfiniteScroll from 'react-infinite-scroller';

import AutorenewIcon from '@mui/icons-material/Autorenew';


const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridRowGap: '40px',
        gap: '70px',
        '@media (max-width: 768px)': {
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))'
        },
        '@media (max-width: 1300px)': {
            gap: '40px',
        },
    },
    buttonWrapper: {
        width: 'fit-content',
        padding: '10px',
        transform: 'scale(1)',
        willChange: 'transform',
        background:
            `linear-gradient(to right, ${theme.palette.text.accentLight} 3px, transparent 3px) 0 0,
            linear-gradient(to right,  ${theme.palette.text.accentLight} 3px, transparent 3px) 0 100%,
            linear-gradient(to left,  ${theme.palette.text.accentLight} 3px, transparent 3px) 100% 0,
            linear-gradient(to left,  ${theme.palette.text.accentLight} 3px, transparent 3px) 100% 100%,
            linear-gradient(to bottom,  ${theme.palette.text.accentLight} 3px, transparent 3px) 0 0,
            linear-gradient(to bottom,  ${theme.palette.text.accentLight} 3px, transparent 3px) 100% 0,
            linear-gradient(to top,  ${theme.palette.text.accentLight} 3px, transparent 3px) 0 100%,
            linear-gradient(to top,  ${theme.palette.text.accentLight} 3px, transparent 3px) 100% 100%;`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '22px 22px',
        transition: '.2s',
        '&:hover': {
            transform: 'scale(1.05)',
            backgroundSize: '25px 25px',
            '& button': {
                transform: 'scale(0.95)',
            }
        }
    },
    button: {
        padding: '16px 51px',
        color: theme.palette.text.accentLight,
        backgroundColor: '#3B3B3B',
        transform: 'scale(1)',
        willChange: 'transform',
        transition: '.2s'
    },
    loader: {
        transform: 'rotate(0)',
        willChange: 'transform',
        color: theme.palette.secondary.main,
        fontSize: '5rem',
        animation: 'rotate 0.6s infinite linear',
    },
}));

const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => {
    const styles = useStyles();
    const isMobile = useMediaQuery('(max-width:768px)');

    const [page, setPage] = useState(1);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        setShowAll(false);
        setPage(1);
    }, [projects]);

    const withRef = projects.map(p => ({ project: p, ref: React.createRef<HTMLAnchorElement>() }));
    const slicedProjects = withRef.slice(0, 8 * page);

    const shouldBtnShow = projects.length > 8;
    const isAllProducts = projects.length == slicedProjects?.length;


    const showMoreProjectsInfinite = () => {
        if (!showAll) return;
        setTimeout(() => {
            if (!showAll) return;
            setPage((page) => page + 10);
        }, 500);
    };

    const showMoreProjects = () => {
        if (isMobile) {
            setPage((page) => page + 1);
        } else {
            setShowAll(true);
            setPage((page) => page + 10);
        }
    };

    const collapseProjects = () => {
        setShowAll(false);
        setPage(1);
    };

    const showMoreText = isMobile ? 'Показать еще' : 'Показать все';

    return (
        <ScrollListWrapper loadMore={showMoreProjectsInfinite} hasMore={showAll && !isAllProducts} threshold={1500}>
            <TransitionGroup className={styles.container} exit={false}>
                {
                    slicedProjects?.map(({ project, ref }) => {
                        return (
                            <CSSTransition
                                key={project.id}
                                nodeRef={ref}
                                timeout={300}
                                classNames="item"
                            >
                                <ProjectCard ref={ref} project={project} />
                            </CSSTransition>
                        );
                    })
                }
            </TransitionGroup>
            {
                shouldBtnShow &&
                (!showAll || (showAll && isAllProducts))
                &&
                <Box className={styles.buttonWrapper}>
                    <Button className={styles.button} onClick={isAllProducts ? collapseProjects : showMoreProjects}>
                        {
                            isAllProducts ? 'Свернуть все' : showMoreText
                        }
                    </Button>
                </Box>
            }
        </ScrollListWrapper>
    );
};


type IProps = { loadMore: () => void, hasMore: boolean, children: React.ReactNode, threshold?: number }

const ScrollListWrapper: React.FC<IProps> = ({ children, loadMore, hasMore, threshold }) => {
    const styles = useStyles();

    return (
        <InfiniteScroll
            loadMore={loadMore}
            hasMore={hasMore}
            threshold={threshold}
            element={'main'}
            style={{
                gap: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
            loader={<AutorenewIcon className={styles.loader} key={0} color={'secondary'} />}
        >
            {children}
        </InfiniteScroll>
    );

};

export default Projects;