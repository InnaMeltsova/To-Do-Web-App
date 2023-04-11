import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Grid } from '@mui/material';
import {styled} from "@mui/material/styles";
import { Cancel } from '@mui/icons-material';

const StyledCardContent = styled(CardContent)({
    padding: '24px',
    maxWidth: '500px'
  });

const CustomCard = ({ list, deleteList, navigateTo }) => { 
       
    return (
        <Card>
            <StyledCardContent>
                <Grid container alignItems='center' justifyContent="space-between" style={{ minWidth: '250px'}}>
                    <span style={{ cursor: 'pointer' }} onClick={navigateTo}>{list.name}</span>
                    <Cancel sx={{ color: 'grey', cursor: 'pointer'}} onClick={deleteList}/>
                </Grid>
            </StyledCardContent>
        </Card>
    )
};

export default CustomCard;