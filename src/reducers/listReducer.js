import {CONSTANTS} from '../actions/index';
let listID = 3;
let cardID = 9;

const initialState = [
    {
        title:"Life Starts",
        id:`list-${0}`,
        cards:[
            {
                id:`card-${0}`,
                text:"Hello My Name is Vaibhav"
            },
            {
                id:`card-${1}`,
                text:"I have done Btech from VIT"
            },
            {
                id:`card-${2}`,
                text:"I am a Software Developer"
            }
        ]
    },
    {
        title:"My Hobbies",
        id:`list-${1}`,
        cards:[
            {
                id:`card-${3}`,
                text:"I have a wonderful family and friends"
            },
            {
                id:`card-${4}`,
                text:"I love trekking and Adventure Sports"
            }
        ]
    },
    {
        title:"Make things Happen",
        id:`list-${2}`,
        cards:[
            {
                id:`card-${5}`,
                text:"I love playing lawn-tennis and chess"
            },
            {
                id:`card-${6}`,
                text:"I never give up and I always try to give my best."
            },
            {
                id:`card-${7}`,
                text:"I love someone"
            },
            {
                id:`card-${8}`,
                text:"And that person is...."
            }
        ]
    },
];

const listReducer =(state = initialState, action) => {
    switch(action.type){
        case CONSTANTS.ADD_LIST:
            const newList = {
                title:action.payload,
                cards:[],
                id:`list-${listID}`
            }
            listID+=1
            return [...state,newList]

        case CONSTANTS.ADD_CARD:{
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
            }
            cardID+=1
            const newState = state.map(list => {
                if(list.id === action.payload.listID){
                    return {
                        ...list,
                        cards:[...list.cards,newCard]
                    }
                }else{
                    return list;
                }
            })
            return newState;
        }

        case CONSTANTS.DRAG_HAPPENDED:
            const {droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type} = action.payload;
            const newState = [...state];
            //Draggging boards around
            if(type === "list") {
                const list = newState.splice(droppableIndexStart,1);
                newState.splice(droppableIndexEnd,0,...list);
                return newState;
            }

            //Drag in the same board
            if(droppableIdStart === droppableIdEnd){
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart,1);
                list.cards.splice(droppableIndexEnd,0,...card)            
            }
            //Drag in other board
            if(droppableIdStart !== droppableIdEnd){
                const listStart = state.find(list => droppableIdStart === list.id);
                const card = listStart.cards.splice(droppableIndexStart,1);
                const listEnd = state.find(list => droppableIdEnd === list.id);

                listEnd.cards.splice(droppableIndexEnd,0,...card);
            }
            return newState;

        default:
            return state;
    }
}

export default listReducer;