import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import MenuButtons from './MenuButtons';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    console.log(store.idNamePairs)
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
            <MenuButtons />
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </div>
            
            <div id="list-selector-footer">
            <Fab 
                color="default" 
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <Typography variant="h3">+</Typography>
            </Fab>
            <Typography variant="h3">Your Lists</Typography>
            </div>
        </div>)
}

export default HomeScreen;