import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Typography, Button, Divider } from '@mui/material';
import { Clear } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { addListItem, updateListItem } from '../../../store/lists';
import { createList } from '../../../api';

const NewList = () => {
    const [listName, setListName] = useState('');
    const [taskName, setTaskName] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const listsArray = useSelector(state => state.lists.listsArr);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    let { id } = useParams();
    const list = listsArray.filter(item => item.id === id)[0];

    const createList = (name) => {
        dispatch(createList({
            name,
            listTasks: []
        }));
        // dispatch(addListItem({
        //    id,
        //    name,
        //    listTasks: []
        // }));
        setListName('');
        navigate(`/lists/${id}`, { replace: true });
     };

    const createTask = (title) => {
        const taskId = uuidv4();
        const listTask = {
            id: taskId,
            title,
            completed: false
        }
        dispatch(updateListItem({
            id,
            name: list.payload.name,
            listTasks: [...list.payload.listTasks, listTask]
        }));
        setTaskName('');
     };

     const handleComplete = (taskId) => {
        dispatch(updateListItem({
            id,
            name: list.payload.name,
            listTasks: list.payload.listTasks.map(task => {
                if(task.id === taskId) {
                    return { ...task, completed: !task.completed }
                }
                return task;
            })
        }));
     };

     const deleteTask = (taskId) => {
        dispatch(updateListItem({
            id,
            name: list.payload.name,
            listTasks: list.payload.listTasks.filter(i => i.id !== taskId)
        }));
     };

     const updateList = (name) => {
        dispatch(updateListItem({
            id,
            name,
            listTasks: [ ...list.payload.listTasks ]
         }));
         setIsEdit(false);
         setListName('');
     };

    // console.log('list', list);

    return (
        <Grid container justifyContent='space-around' alignItems="center" style={{ marginTop: '30px' }}>
            {list && !isEdit
            ? <Typography variant="h4">{list.name}</Typography>
            : <TextField 
                label="List name"
                size="small" 
                value={isEdit && !listName ? list.name : listName}
                onChange={(e) => setListName(e.target.value)}
            />
            }
            <Grid>
                {isEdit
                ? <Button 
                    variant="contained"
                    onClick={() => updateList(listName || list.name)} 
                >
                    Save
                </Button>
                : <Button 
                    variant="contained"
                    onClick={list ? () => setIsEdit(true) : () => createList(listName)} 
                >
                    {list ? 'Update' : 'Create'}
                </Button>
                }
            </Grid>
            <Grid container>
                <Divider variant="middle" style={{ width: '100%', margin: '10px 0 25px 0' }} />
            </Grid>
            {list && <Typography variant="h4">Tasks</Typography> }
            {list &&
            <Grid container justifyContent='space-around' alignItems="center" style={{ marginTop: '30px' }}>
                <TextField 
                    label="Add task"
                    size="small" 
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <Button 
                    variant="contained"
                    onClick={() => createTask(taskName)} 
                >
                    Add
                </Button>
            </Grid>
            }
            {list && list.listTasks && 
                <Grid>
                    <ul style={{marginTop: '50px'}}>
                    {list.listTasks.map(task => {
                        return (
                            <Grid container key={task.id}>
                                <li  
                                    onClick={() => handleComplete(task.id)}
                                    style={{
                                        textDecoration: task.completed && "line-through",
                                        fontSize: '18px',
                                        cursor: 'pointer'
                                    }}
                                    >
                                    {task.title}
                                </li>
                            <Clear sx={{ marginLeft: '20px', cursor: 'pointer' }} onClick={() => deleteTask(task.id)}/>
                            </Grid>
                        )
                    })}
                </ul>
                </Grid>
            }
        </Grid>
       )
};

export default NewList;