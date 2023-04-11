import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteListItem } from '../../../store/lists';
import { Grid, Typography, Button, Divider } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { CustomCard } from '../../../components/card';
import { getLists } from '../../../api';

const Home = () => {

   const listsArray = useSelector(state => state.lists.listsArr);
   const accessToken = useSelector(state => state.auth.accessToken);
   const dispatch = useDispatch();

   const navigate = useNavigate();

   useEffect(() => {
      dispatch(getLists());
   }, [dispatch]);

   console.log('listsArray', listsArray);
   return (
    <Grid container justifyContent='space-around' style={{ marginTop: '30px' }}>
      <Typography variant="h4">Your lists</Typography>
      <Grid>
         <Button 
            variant="contained" 
            onClick={() => navigate('/lists/new')}
         >
            Create new list
         </Button>
      </Grid>
      <Grid container>
         <Divider variant="middle" style={{ width: '100%', margin: '10px 0 25px 0' }} />
      </Grid>
      {listsArray[0] 
      ? <Grid container justifyContent='space-around' alignItems="center">
         {listsArray.map((list) => (
            <Grid key={list.id} sx={{ margin: '20px 0 20px 0', padding: '0 5% 0 5%' }}>
               <CustomCard  
                  list={list} 
                  deleteList={() => dispatch(deleteListItem(list))}
                  navigateTo={() => navigate(`/lists/${list.id}`)} 
               />
            </Grid>
         ))}
      </Grid> 
      : <Grid container style={{ marginLeft: '15%'}}>You don't have any lists yet.</Grid>
      }
    </Grid>
   )
};

export default Home;