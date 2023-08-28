import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {Draggable} from 'react-beautiful-dnd';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';
//import './Card.component.css';

const CardContainer = styled.div`
    margin-bottom:8px;
`

const Cards = ({text,id,index}) => {
    return (
       <Draggable draggableId={String(id)} index={index}>
           {provided => (
               <CardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                   
               <Card className="card">
               {/* <EditIcon/> */}
               <CardContent>
                   <Typography gutterBottom>
                       {text}
                   </Typography>
               </CardContent>
           </Card>
           </CardContainer>
           )}
        </Draggable>
            
    )
}

export default Cards;
