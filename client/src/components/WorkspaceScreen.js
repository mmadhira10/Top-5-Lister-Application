import { React, useContext, useState } from "react";
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { tablePaginationClasses, Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import TextField from '@mui/material/TextField';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");
    const arr = new Array(5)
    let title = store.currentList.name;

    function handleUpdateText(event) {
        setText(event.target.value);
        let index = event.target.id.substring(6)
        arr[index] = event.target.value;
    }

    function handleUpdateTitle(event)
    {
        console.log(store.currentList.name)
        setText(event.target.value);
        title = event.target.value
    }

    function handleSave(event) 
    {
        event.stopPropagation();
        store.changeItemNames(store.currentList._id, arr)
        store.changeListName(store.currentList._id, title)
    }

    function handlePublish(event) {

    }

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%', height: '10%', bgcolor: 'background.grey' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Box >
                            <Box sx={{ p: 1 }}>
                                <Typography variant="h7">{index + 1}.</Typography>
                            </Box>
                            <Box sx={{ p: 0 }}>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    fullWidth="true"
                                    required
                                    id={"item-" + (index+1)}
                                    label={"Item #" + (index+1)}
                                    name="item"
                                    autoComplete="Top 5 List Item"
                                    className='top5-item'
                                    onChange={handleUpdateText}
                                    defaultValue={item}
                                    inputProps={{style: {fontSize: 24}}}
                                    InputLabelProps={{style: {fontSize: 24}}}
                                    autoFocus
                                />
                            </Box>
                        </Box> 
                    ))
                }
            </List>;
    }

    console.log(store.currentList.name)

    return (
        <div id="top5-workspace">
            <div id="workspace-edit">
                {editItems}
            </div>
            <Box sx={{display: "inline-flex"}}>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h4">Title:</Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                <TextField
                   placeholder="List Title"
                   size="small"
                   onChange={handleUpdateTitle}
                   defaultValue={store.currentList.name} />
                </Box>
            </Box>
            
            <Box component="span" sx={{ p: 3, border: '1px dashed grey', marginLeft: "500px" }}>
                <Button
                onClick={handleSave}>Save</Button>
            </Box>
            <Box component="span" sx={{ p: 3, border: '1px dashed grey' }}>
                <Button
                onClick={handlePublish}>Publish</Button>
            </Box>
        </div>
    )
}

export default WorkspaceScreen;