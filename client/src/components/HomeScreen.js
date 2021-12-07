import React, { useContext, useEffect } from 'react'
import { useState } from "react";

import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import Fab from '@mui/material/Fab'
import List from '@mui/material/List';

import Grid from '@mui/material/Grid';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FunctionsIcon from '@mui/icons-material/Functions';

import SortIcon from '@mui/icons-material/Sort';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { TextField } from '@mui/material';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
        const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function handleHomeView (event)
    {
        event.stopPropagation();
        store.setHomeView()
    }

    function handleAllView (event)
    {
        event.stopPropagation();
        store.setAllView()
    }

    function handleUserView (event)
    {
        event.stopPropagation();
        store.setUserView()
    }

    useEffect(() => {
        store.loadIdNamePairs();
    }, [store.view]);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    console.log(store.idNamePairs)
    let description;
    let icon;
    if(store.view == "Home")
    {
        description = "Your List"
        icon = 
        <Fab 
            color="default" 
            id="add-list-button"
            onClick={handleCreateNewList}
        >
            <Typography variant="h3">+</Typography>
        </Fab>;
    }
    if(store.view == "Users")
    {
        description = "Users"
    }
    if(store.view == "All Lists")
    {
        description = "All Lists"
    }

    if (store) {
        listCard = 
        
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.grey' }}>
                <Grid container rowSpacing={1}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        username={pair.email}
                        views={pair.views}
                        publish={pair.publish}
                        date={pair.date}
                        likes={pair.likes}
                        dislikes={pair.dislikes}
                        selected={false}
                    />
                ))
            }
            </Grid>
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <div id="menu-buttons">
            <Toolbar>
                <Tabs value={value} onChange={handleChange} aria-label="icon label tabs">
                    <Tab icon={<HomeOutlinedIcon 
                    fontSize="medium"/>} label="HOME"
                    onClick={handleHomeView} />
                    <Tab icon={<GroupOutlinedIcon 
                    fontSize="medium"/>} label="ALL LISTS" 
                    onClick={handleAllView}/>
                    <Tab icon={<PersonOutlineIcon 
                    fontSize="medium"/>} label="USER'S LIST"
                    onClick={handleUserView}/>
                    <Tab icon={<FunctionsIcon 
                    fontSize="medium"/>} label="COMMUNITY LISTS"/>
                </Tabs>

            <TextField
                margin="normal"
                placeholder="Search"
                color="secondary"
                size="small"
                />
            <Typography                        
                        variant="h8"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}     
                        id="menu-sort"                   
                    >SORT BY</Typography>
            <IconButton
            size="large"
            edge="end">
                <SortIcon 
                fontSize="large"/>
            </IconButton>
            </Toolbar>
        </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </div>
            
            <div id="list-selector-footer">
            {icon}
            <Typography variant="h3">{description}</Typography>
            </div>
        </div>)
}

export default HomeScreen;