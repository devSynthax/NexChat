import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const PublicHeader = () => {
    return (
        <AppBar position="static" color="default" className="shadow-md">
            <Toolbar className="flex justify-between">
                <Typography variant="h6" className="text-xl font-bold" component={Link} to="/">
                    MyLogo
                </Typography>
                <div className="space-x-4">
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Contact</Button>
                    <Button color="primary" variant="outlined" component={Link} to="/login" className="text-blue-600 border-blue-600">
                        Login
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default PublicHeader;
