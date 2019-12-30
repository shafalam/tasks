import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import TextField from '@material-ui/core/TextField';

// icon import
import AddCircleIcon from '@material-ui/icons/AddCircle';

// import custom components 
import MultilineTextFields from "./TextArea"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default function CheckboxList() {
  const classes = useStyles();
  const aTask:string[] = [];
  const [task, setTask] = React.useState(aTask);
  let initialEdit: boolean[] = [];
  const [edit, setEdit] = React.useState(initialEdit);
  let initialTask: boolean[] = [];
  const [taskCheck, setTaskCheck] = React.useState(initialTask);

  const handleToggle = (index: number) => () => {
    const editedTask = [...taskCheck];
    const taskStatus = editedTask[index];
    editedTask[index] = !taskStatus;
    setTaskCheck(editedTask);
  };

  const handleEdit = (num: number) => {
    const initialEditStatus = edit[num];
    console.log("each list is clicked" + edit + num);
  }

  const addTaskHandler = () => {
    console.log("task added");
    const newTask: boolean = false;
    const immutableTask = [...taskCheck];
    immutableTask.push(newTask);
    setTaskCheck(immutableTask);
    const newEdit: boolean = false;
    const immutableEdit = [...edit];
    immutableEdit.push(newEdit);
    setEdit(immutableEdit);
  }

  const editText = taskCheck.map((value, index) => {
    if(edit && value){
      return <MultilineTextFields />
    }
  })
  console.log(taskCheck);
  return (
    <div>
      <div>
        <AddCircleIcon onClick={addTaskHandler}/>
        <h3>Add a task</h3>
      </div>
      
      <List className={classes.root}>
      {taskCheck.map((value, key) => {
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
                onClick={handleToggle(key)}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`Line item ${value}`} />
            <ListItemSecondaryAction>
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