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

import { React, useContext, useState } from "react";
import { TextField } from '@mui/material';



export default function MenuButtons() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return(
        <div id="menu-buttons">
            <Toolbar>
                <Tabs value={value} onChange={handleChange} aria-label="icon label tabs">
                    <Tab icon={<HomeOutlinedIcon 
                    fontSize="medium"/>} label="HOME" />
                    <Tab icon={<GroupOutlinedIcon 
                    fontSize="medium"/>} label="ALL LISTS" />
                    <Tab icon={<PersonOutlineIcon 
                    fontSize="medium"/>} label="USER'S LIST"/>
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
    )
}

