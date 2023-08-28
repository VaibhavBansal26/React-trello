import React from 'react';
import { Component } from 'react';
import TrelloBoard from './components/TrelloBoard/TrelloBoard.component';
import {connect} from 'react-redux';
import AddButton from './components/AddButton/addButton.component';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {sort} from './actions/cardAction';
import Header from './components/Header/Header.component';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';
//import './App.css';

const ListContainer = styled.div`
  display:flex;
  flex-direction:row;
  margin:10px;
`


class App extends Component{
  onDragEnd = (result) => {
    const {destination,source,draggableId,type} = result;
    if(!destination) {
      return;
    }
    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  }
  render(){
  const {lists} = this.props;
  return (
    <DragDropContext onDragEnd={this.onDragEnd}>
    <div className="App">
      <Header></Header>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {provided => (
          <ListContainer className="trello_board" {...provided.droppableProps} ref={provided.innerRef}>
              
          {lists?.map((list,i) => (
            <>
            <TrelloBoard 
              title={list.title} 
              cards={list.cards} 
              key={list.id} 
              listID={list.id}
              index={i}
              />
             
              </>
          ))}
          {provided.placeholder}
          <AddButton list/>
          </ListContainer>

        )}
      </Droppable>
    </div>
    </DragDropContext>
  );
}
}

const mapStateToProps = state => ({
  lists:state.lists
})

export default connect(mapStateToProps)(App);
