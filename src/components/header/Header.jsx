import React from 'react';
import { Box, AppBar, Toolbar, Grid, Button } from '@mui/material';
import './styles.css';

const Header = ({username, onLogOut}) => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar className='container'>
                    Hello {username}{' '}
                    <Grid>
                        <Button 
                            variant="outlined" 
                            style={{ color: 'white', borderColor: "white" }} 
                            onClick={onLogOut}
                        >
                            Log out
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
        )

};

export default Header;