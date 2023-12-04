import React from 'react';
import { CssBaseline, Paper, Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { ArticleOutlined, GraphicEqOutlined, VerifiedOutlined, FenceOutlined } from '@mui/icons-material';

export default function Navigation() {

    return (
        <Box sx={{ pb: 7 }} >
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels={true}   sx={{background:"#1976d2"}}>
                    <BottomNavigationAction
                    sx={{color:"white"}}
                        label="Home"
                        href="/"
                        icon={<FenceOutlined />}
                    />
                    <BottomNavigationAction
                    sx={{color:"white"}}
                        label="Bettings"
                        href="/allbets"
                        icon={<VerifiedOutlined />}
                    />
                    <BottomNavigationAction
                    sx={{color:"white"}}
                        label="Place Bet"
                        href="/placebet"
                        icon={<GraphicEqOutlined />}
                    />
                    <BottomNavigationAction sx={{color:"white"}}   label="Admin" href="/winner" icon={<ArticleOutlined />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}