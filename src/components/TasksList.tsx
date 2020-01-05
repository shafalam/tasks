import React from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Rating from '@material-ui/lab/Rating';

// icon import
import AddCircleIcon from '@material-ui/icons/AddCircle';

// import custom components 
import MultilineTextFields from "./TextArea"

const styles = (theme: Theme) =>
({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    }
  });

interface TaskProperty{
  classes:any
}

class Task extends React.Component<TaskProperty> {
  
  aTask:string[] = [];
  
  initialEdit: boolean[] = [];

  initialTask: boolean[] = [];

  aRating: (number| null)[] = [];

  state = {
    task: this.aTask,
    edit: this.initialEdit,
    taskCheck: this.initialTask,
    rating: this.aRating
  }

  handleToggle = (index: number) => () => {
    const editedTask = [...this.state.taskCheck];
    const taskStatus = editedTask[index];
    editedTask[index] = !taskStatus;
    this.setState({taskCheck: editedTask});
  };

  handleEdit = (num: number) => {
    const initialEditStatus = this.state.edit[num];
    const newEdit = [...this.state.edit];
    newEdit[num] = !initialEditStatus;
    this.setState({edit: newEdit});
    console.log("each list is clicked for edit" + this.state.edit + num);
  }

  addTaskHandler = () => {
   
    const newTask: boolean = false;
    const immutableTask = [...this.state.taskCheck];
    immutableTask.push(newTask);
    const newEdit: boolean = false;
    const immutableEdit = [...this.state.edit];
    immutableEdit.push(newEdit);

    const rating = 0;
    const newRating = [...this.state.rating];
    newRating.push(rating);

    this.setState({taskCheck: immutableTask , edit: immutableEdit, rating: newRating });
    console.log("task added");
  }

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const newTask = event.currentTarget.value;
    console.log(newTask);
    const allTasks = [...this.state.task];
    allTasks[index] = newTask;
    this.setState({task: allTasks});
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>, index: number) => {
    event.preventDefault();
    this.handleEdit(index);
  };

  handleRating = (newValue: number|null, index: number)=> {
    const newRating: (number | null)[] = [...this.state.rating];
    newRating[index] = newValue;
    console.log("index: " + index + " rating: " + newValue);
    this.setState({rating: newRating});
  }
 
  
  render(){
    const { classes } = this.props;

    const editText = this.state.edit.map((value, index) => {
      if(value){
        return <MultilineTextFields handleChange={(event: React.ChangeEvent<HTMLTextAreaElement>)=>this.handleChange(event, index)} 
        handleSubmit={(event: React.FormEvent<HTMLFormElement>) => this.handleSubmit(event,index)}/>
      }
    });
    return (
      <div>
        <div style={{alignContent: "center", margin: "0.5%"}}>
          <AddCircleIcon onClick={this.addTaskHandler}/>
          <h3 style={{margin: "0px"}}>Add a task</h3>
        </div>
        {editText}
        <List className={classes.root}>
        {this.state.taskCheck.map((value, key) => {
          const labelId = `checkbox-list-label-${value}`;
          return (
            <ListItem key={key} role={undefined} dense button>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked= {value}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  onClick={this.handleToggle(key)}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={this.state.task[key]} />
              <Rating name="simple-controlled" value={this.state.rating[key]} 
              onChange={(event: React.ChangeEvent<{}>, value:number|null)=> this.handleRating(value, key)} />
              <ListItemSecondaryAction onClick={() => this.handleEdit(key)}>
                <IconButton edge="end" aria-label="comments" >
                  <CommentIcon />
                </IconButton >
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      </div>      
    );
  }
}

export default withStyles(styles, {withTheme: true})(Task);