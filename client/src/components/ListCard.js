import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';




/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [view, setView] = useState(false)
    const [views, setViews ] = useState(props.views)
    const { idNamePair, selected, username, publish, date, likes, dislikes, currUser } = props;

    function handleLoadList(event, id) {
        if (!event.target.disabled) {

            //console.log(id)
            //console.log(idNamePair._id)
            // CHANGE THE CURRENT LIST
            console.log(idNamePair.views)
            store.setCurrentList(id);
        }
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleViewCount() 
    {
        if(!view)
        {
            setView(true);
            store.updateViewCount(idNamePair._id);
            setViews(views + 1)
        }
        else{
            setView(false);
        }   
    }

    function handleLikeButton(event, id)
    {
        event.stopPropagation();
        store.updateLikes(id);
    }

    function handleDislikeButton(event, id)
    {
        event.stopPropagation();
        store.updateDislikes(id);
    }


    //IF PUBLISH THEN REMOVE EDIT BUTTON AND PUT DATE
    let editOrPub = 
        <Typography style={{fontSize:'12pt'}} 
        style={{textDecoration:"underline"}} 
        color="text.secondary" 
        onClick={(event) => {
        handleLoadList(event, idNamePair._id)}}>
            Edit</Typography>

    if (publish)
    {
        editOrPub = 
            <Typography style={{fontSize:'12pt'}}>
            Date Published: {date}</Typography>
    }


    //IF PUBLISH SET UP LIKE BUTTON AND DISLIKE BUTTON
    let likeButton = "";
    let dislikeButton = "";
    let likesnumber;
    let dislikesnumber;
    if (publish)
    {
        likesnumber= likes.length;
        likeButton = 
            <IconButton onClick={(event) => {
                handleLikeButton(event, idNamePair._id)
            }}>
                <ThumbUpOutlinedIcon />
            </IconButton>;
        
        dislikesnumber= dislikes.length;
        dislikeButton = 
            <IconButton onClick={(event) => {
                handleDislikeButton(event, idNamePair._id)
            }}>
                <ThumbDownOutlinedIcon />
            </IconButton>;
        
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }

    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    // CONDITIONS FOR A PUBLISHED AND NON PUBLISHED LIST CARD
    let cardElement =
    <Grid xs={12}>
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            expandIcon={<ExpandMoreIcon />}
            sx={{ marginTop: '0px', display: 'flex', p: 1, borderRadius:'25px', border: "1px solid"}}
            style={{ width: '100%' }}
            style={{
                fontSize: '24pt'
            }}
            style={{backgroundColor:"white"}}
        >
                <Box sx={{ p: 1, flexGrow: 1 }}
                style={{
                    fontSize: '24pt'
                }}>
                    {idNamePair.name}

                    {editOrPub}

                    <Typography style={{fontSize:'12pt'}}>By:  {username}</Typography>
                </Box>
                
                <Box sx={{p: 5}}
                style={{
                    fontSize: '12pt'
                }}>
                    {likeButton}
                    {likesnumber}
                </Box>
                <Box sx={{p: 5}}
                style={{
                    fontSize: '12pt'
                }}>
                    {dislikeButton}
                    {dislikesnumber}
                </Box>

                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'24pt'}} />
                    </IconButton>
                    <Typography style={{fontSize:'8pt'}}>views: {views}</Typography>
                    <IconButton onClick={handleViewCount}>
                        <ExpandMoreIcon style={{fontSize: '24pt'}}/>
                    </IconButton>
                </Box>
            </ListItem>
        </Grid>

    if (view) {
        cardElement =
        <Grid xs={12}>
            <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            expandIcon={<ExpandLessIcon />}
            sx={{ marginTop: '0px', display: 'flex', p: 1, borderRadius:'25px', border: "1px solid"}}
            style={{ width: '100%' }}
            style={{backgroundColor:"white"}}
        >
                <Box sx={{ p: 1, flexGrow: 1 }}
                style={{
                    fontSize: '24pt'
                }}>
                    {idNamePair.name}

                    {editOrPub}

                    <Typography style={{fontSize:'12pt'}}>By:  {username}</Typography>
                    <Box>
                        <Typography>1. {idNamePair.items[0]} </Typography>
                        <Typography>2. {idNamePair.items[1]}</Typography>
                        <Typography>3. {idNamePair.items[2]}</Typography>
                        <Typography>4. {idNamePair.items[3]}</Typography>
                        <Typography>5. {idNamePair.items[4]}</Typography>
                    </Box>
                </Box>

                <Box sx={{p: 5}}
                style={{
                    fontSize: '12pt'
                }}>
                    {likeButton}
                    {likesnumber}
                </Box>
                <Box sx={{p: 5}}
                style={{
                    fontSize: '12pt'
                }}>
                    {dislikeButton}
                    {dislikesnumber}
                </Box>

                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'24pt'}} />
                    </IconButton>
                    <Typography style={{fontSize:'8pt'}}>views: {views}</Typography>
                    <IconButton onClick={handleViewCount}>
                        <ExpandLessIcon style={{fontSize: '24pt'}}/>
                    </IconButton>
                </Box>
            </ListItem>
        </Grid>
    }
    return (
        cardElement
    );
}

export default ListCard;