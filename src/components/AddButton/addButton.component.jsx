import React from 'react';
import Icon from '@material-ui/core/Icon';
import './addButton.component.css';
import { Button, Card } from '@material-ui/core';
import Textarea from 'react-textarea-autosize';
import {connect} from 'react-redux';
import {addList,addCard} from '../../actions';


class AddButton extends React.Component{
    state = {
        formOpen: false,
        text:""
    }
    
    openForm = () => {
        this.setState({
            formOpen:true
        });
    }
    closeForm = (e) => {
        this.setState({
            formOpen:false
        })
    }

    handleInputChange = e => {
        this.setState({
            text:e.target.value
        })
    }

    handleAddList = () => {
        const { dispatch } = this.props;
        const { text } = this.state;

        if(text) {
            this.setState({
                text:""
            })
            dispatch(addList(text))
        }
        return;
    }

    handleAddCard = () => {
        const { dispatch,listID } = this.props;
        const { text } = this.state;
        if (text) {
            dispatch(addCard(listID,text))
            this.setState({
                text:""
            })
        }
    }

    renderForm = () => {
        const { list } = this.props;
        const placeholder = list
        ? "Enter the title"
        : "Enter the title for this card";

        const buttonTitle = list ? "Add List" : "Add Card";

        return <div>
            <Card style={{
            minWidth: 272,
            minHeight: 80,
            padding:"6px 8px 2px"
            }}>
                <Textarea
                placeholder={placeholder}
                autoFocus
                onBlur={this.closeForm}
                value={this.state.text}
                onChange={this.handleInputChange}
                style={{
                    resize:"none",
                    width:"100%",
                    overflow:"hidden",
                    outline:"none",
                    border:"none"
                }}
                ></Textarea>
            </Card>
            <div className="formButtonGroup">
            <Button 
            onMouseDown = {list ? this.handleAddList : this.handleAddCard}
            variant="contained" style={{color:"white",backgroundColor:"#5aac44"}}>{buttonTitle}{" "}</Button>
            <Icon style={{marginLeft:8,cursor:"pointer"}}>close</Icon>
            </div>
        </div>
    }

    renderAddButton = () => {
        const {list} = this.props;
        const buttonText = list ? "Add another User":"Add another Task";
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? "white" : "inherit";
        const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";  
        return(
            <div
                onClick={this.openForm}  
                className = "addButton" style={{
                opacity:buttonTextOpacity,
                color:buttonTextColor,
                backgroundColor:buttonTextBackground
                }}>
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </div>
        )
    }
    render(){
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}
export default connect()(AddButton);

