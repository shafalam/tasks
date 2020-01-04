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


// icon import
import AddCircleIcon from '@material-ui/icons/AddCircle';

// import custom components 
import MultilineTextFields from "./TextArea"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
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
    const newEdit = [...edit];
    newEdit[num] = !initialEditStatus;
    setEdit(newEdit);
    console.log("each list is clicked for edit" + edit + num);
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

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const newTask = event.currentTarget.value;
    console.log(newTask);
    const allTasks = [...task];
    allTasks[index] = newTask;
    setTask(allTasks);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, index: number) => {
    event.preventDefault();
    handleEdit(index);
  };

  const editText = edit.map((value, index) => {
    if(value){
      return <MultilineTextFields handleChange={(event: React.ChangeEvent<HTMLTextAreaElement>)=>handleChange(event, index)} 
      handleSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event,index)}/>
    }
  })
  console.log("task status" + taskCheck);
  console.log("edit status" + edit);
  return (
    <div>
      <div style={{alignContent: "center", margin: "0.2px"}}>
        <AddCircleIcon onClick={addTaskHandler}/>
        <h3 style={{margin: "0px"}}>Add a task</h3>
      </div>
      {editText}
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
            <ListItemText id={labelId} primary={task[key]} />
            <ListItemSecondaryAction onClick={() => handleEdit(key)}>
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