import React from 'react';
import Card from '../Card/Card.component';
//import './TrelloBoard.component.css';
import AddButton from '../AddButton/addButton.component';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';

const CardContainer = styled.div`
    background-color: #dfe3e6;
    border-radius: 3px;
    width:300px;
    padding:8px;
    height: 100%;
    margin-right: 8px;
`

const TrelloBoard = ({title,cards,listID,index}) => {
    return (
        <Draggable draggableId={String(listID)}index={index}>
            {provided => (
                 <CardContainer {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps} className="cardContainer">
                      {/* <EditIcon/> */}
                <Droppable droppableId={String(listID)}>
                {(provided)=>(
                   <div {...provided.droppableProps} ref={provided.innerRef}>
                    <h4>{title}</h4>
                    {cards?.map((card,i) => (
                        <Card key={card.id} text={card.text} id={card.id} index={i}/>
                    ))}
                   
                    {provided.placeholder}
                    <AddButton listID={listID}/>
                </div>
    
                )}
            
            </Droppable>
            </CardContainer>

            )}
        </Draggable>
        
    )
}

export default TrelloBoard;
