import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from './store-request-api'
import AuthContext from '../auth'
import { listItemTextClasses } from '@mui/material';
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    UPDATE_VIEWS: "UPDATE_VIEWS",
    CHANGE_ITEM_NAMES: "CHANGE_ITEM_NAMES",
    SET_VIEW: "SET_VIEW"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null,
        view: "Home"
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.top5List,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    view: store.view
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    view: store.view
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    view: store.view
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    view: store.view
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload,
                    view: store.view
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    view: store.view
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    view: store.view
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: true,
                    listMarkedForDeletion: null,
                    view: store.view
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.UPDATE_VIEWS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    view: store.view
                });
            }

            case GlobalStoreActionType.CHANGE_ITEM_NAMES: {
                return setStore({
                    idNamePairs: payload,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    view: store.view
                });
            }

            case GlobalStoreActionType.SET_VIEW: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    view: payload
                });
            }

            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.status === 200) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5(top5List._id, top5List);
                if (response.status === 200) {
                    async function getListPairs(top5List) {
                        response = await api.getTop5Lists();
                        if (response.status === 200) {
                            let pairsArray = response.data.idNamePairs;
                            if (store.view == "Home")
                            {
                                pairsArray = pairsArray.filter(pair => auth.user.email === pair.email)
                            }
                            else if (store.view == "All" || store.view == "User")
                            {
                                pairsArray = pairsArray.filter(pair => pair.publish === true)
                            }
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: pairsArray,
                                    top5List: null
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }

    //THIS FUNCTION INCREASES THE VIEW COUNT
    store.changeItemNames = async function (id, items)
    {
        let response = await api.getTop5ListById(id);
        if (response.status === 200) 
        {
            let top5List = response.data.top5List;
                console.log(items);
                console.log(top5List.items);
                top5List.items = items;

                async function updateList(top5List) {
                    response = await api.updateTop5List(id, top5List);
                    if (response.status === 200) {
                        async function getListPairs(top5List) {
                            response = await api.getTop5Lists();
                            if (response.status === 200) {
                                let pairsArray = response.data.idNamePairs;
                                if (store.view == "Home")
                                {
                                    pairsArray = pairsArray.filter(pair => auth.user.email == pair.email)
                                }
                                else if (store.view == "All" || store.view == "User")
                                {
                                    pairsArray = pairsArray.filter(pair => pair.publish == true)
                                }
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ITEM_NAMES,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(top5List)
                    }
                }
                updateList(top5List);
        }
    }

    store.changeTop5List = function(id, title, list)
    {  
        store.changeItemNames(id, list);
        store.changeListName(id, title);
        store.loadIdNamePairs();
        history.push("/")
    }


    //THIS FUNCTION INCREASES THE VIEW COUNT
    store.updateViewCount = async function (id)
    {
        let response = await api.getTop5ListById(id);
        if (response.status === 200) 
        {
            let top5List = response.data.top5List;
            top5List.views = top5List.views + 1;
                console.log(top5List.views)
                async function updateList(top5List) {
                    console.log(top5List)
                    response = await api.updateTop5List(id, top5List);
                    if (response.status === 200) {
                        async function getListPairs(top5List) {
                            response = await api.getTop5Lists();
                            console.log(top5List)
                            if (response.status === 200) {
                                console.log(top5List)
                                let pairsArray = response.data.idNamePairs;
                                if (store.view == "Home")
                                {
                                    pairsArray = pairsArray.filter(pair => auth.user.email == pair.email)
                                }
                                else if (store.view == "All" || store.view == "User")
                                {
                                    pairsArray = pairsArray.filter(pair => pair.publish == true)
                                }
                                storeReducer({
                                    type: GlobalStoreActionType.UPDATE_VIEWS,
                                    payload: pairsArray
                                });
                            }
                        }
                        console.log(top5List)
                        getListPairs(top5List)
                    }
                }
                console.log(top5List.views)
                updateList(top5List);
        }
    }

    //UPDATES PUBLISH BUTTON
    store.updatePublish = async function (id)
    {
        let response = await api.getTop5ListById(id);
        if (response.status === 200) 
        {
            let top5List = response.data.top5List;
            top5List.publish = true;
                async function updateList(top5List) {
                    response = await api.updateTop5List(id, top5List);
                    if (response.status === 200) {
                        async function getListPairs(top5List) {
                            response = await api.getTop5Lists();
                            if (response.status === 200) {
                                let pairsArray = response.data.idNamePairs;
                                if (store.view == "Home")
                                {
                                    pairsArray = pairsArray.filter(pair => auth.user.email == pair.email)
                                }
                                else if (store.view == "All" || store.view == "User")
                                {
                                    pairsArray = pairsArray.filter(pair => pair.publish == true)
                                }
                                storeReducer({
                                    type: GlobalStoreActionType.UPDATE_VIEWS,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(top5List)
                    }
                }
                updateList(top5List);
        }
    }

    //UPDATES LIKES BUTTON
    store.updateLikes = async function (id)
    {
        let response = await api.getTop5ListById(id);
        if (response.status === 200) 
        {
            let top5List = response.data.top5List;
            if (!top5List.likes.includes(auth.user.email))
            {
                top5List.likes.push(auth.user.email)
                async function updateList(top5List) {
                    response = await api.updateTop5List(id, top5List);
                    if (response.status === 200) {
                        async function getListPairs(top5List) {
                            response = await api.getTop5Lists();
                            if (response.status === 200) {
                                let pairsArray = response.data.idNamePairs;
                                if (store.view == "Home")
                                {
                                    pairsArray = pairsArray.filter(pair => auth.user.email == pair.email)
                                }
                                else if (store.view == "All" || store.view == "User")
                                {
                                    pairsArray = pairsArray.filter(pair => pair.publish == true)
                                }
                                storeReducer({
                                    type: GlobalStoreActionType.UPDATE_VIEWS,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(top5List)
                    }
                }
                updateList(top5List);
            }
        }
    }

    //UPDATES DISLIKES BUTTON
    store.updateDislikes= async function (id)
    {
        let response = await api.getTop5ListById(id);
        if (response.status === 200) 
        {
            let top5List = response.data.top5List;
            if (!top5List.dislikes.includes(auth.user.email))
            {
                top5List.dislikes.push(auth.user.email)
                async function updateList(top5List) {
                    response = await api.updateTop5List(id, top5List);
                    if (response.status === 200) {
                        async function getListPairs(top5List) {
                            response = await api.getTop5Lists();
                            if (response.status === 200) {
                                let pairsArray = response.data.idNamePairs;
                                if (store.view == "Home")
                                {
                                    pairsArray = pairsArray.filter(pair => auth.user.email == pair.email)
                                }
                                else if (store.view == "All" || store.view == "User")
                                {
                                    pairsArray = pairsArray.filter(pair => pair.publish == true)
                                }
                                storeReducer({
                                    type: GlobalStoreActionType.UPDATE_VIEWS,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(top5List)
                    }
                }
                updateList(top5List);
            }
        }
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        const response = await api.createTop5List(newListName, ["?", "?", "?", "?", "?"], auth.user.email, 
            Date().toLocaleString().substring(4, 15));
        console.log(Date().toLocaleString().substring(4, 15))
        if (response.status === 201) {
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            });

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () {
        const response = await api.getTop5Lists();
        if (response.status === 200) {
            let pairsArray = response.data.idNamePairs;
            if (store.view == "Home")
            {
                pairsArray = pairsArray.filter(pair => auth.user.email == pair.email)
            }
            else if (store.view == "All" || store.view == "User")
            {
                pairsArray = pairsArray.filter(pair => pair.publish == true)
            }
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: pairsArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.status === 200) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.status === 200) {
            store.loadIdNamePairs();
            history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let top5List;
        let response = await api.getTop5ListById(id);
        if (response.status === 200) {
            top5List = response.data.top5List;
            response = await api.updateTop5List(top5List._id, top5List);
            if (response.status === 200) {
                console.log(top5List)
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                console.log(store.currentList) 
            }
        }
        history.push("/top5list/" + top5List._id);
    }

    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        store.updateCurrentList();
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5List(store.currentList._id, store.currentList);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }

    store.setHomeView = function () 
    {
        storeReducer({
            type: GlobalStoreActionType.SET_VIEW,
            payload: "Home"
        });
    }

    store.setAllView = function () 
    {
        storeReducer({
            type: GlobalStoreActionType.SET_VIEW,
            payload: "All"
        });
    }

    store.setUserView = function () 
    {
        storeReducer({
            type: GlobalStoreActionType.SET_VIEW,
            payload: "User"
        });
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };