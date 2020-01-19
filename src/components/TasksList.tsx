import React from 'react';
import { Theme, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
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
      maxWidth: '360em',
      backgroundColor: theme.palette.background.paper
    }
  });

interface TaskProperty {
  check: boolean;
  description: string;
  rating: number | null;
  edit: boolean;
  date?: Date;
}

// for styles
interface TaskListProperty {
  classes: any
}

class TaskList extends React.Component<TaskListProperty> {

  aTask: TaskProperty[] = [];
  bTask: TaskProperty[] = [];

  state = {
    completedTask: this.aTask,
    inCompletedTask: this.bTask
  }

  handleCheck = (index: number) => () => {
    const newTasks = [...this.state.inCompletedTask];
    const thatTask = newTasks[index];
    const taskCheck = newTasks[index].check;
    thatTask.check = !taskCheck;
    thatTask.date = new Date();
    console.log("utc day " + thatTask.date.getUTCDate());
    //newTasks[index].check = !taskCheck;
    const completedTask = [...this.state.completedTask];

    completedTask.push(thatTask);
    newTasks.splice(index, 1);
    this.setState({ inCompletedTask: newTasks, completedTask: completedTask });
  };

  handleEdit = (index: number) => {
    const initialEditStatus = this.state.inCompletedTask[index].edit;
    const newTasks = [...this.state.inCompletedTask];
    newTasks[index].edit = !initialEditStatus;
    this.setState({ inCompletedTask: newTasks });
    console.log("each list is clicked for edit" + this.state.inCompletedTask[index].edit + index);
  }

  addTaskHandler = () => {
    const aTask: TaskProperty = {
      check: false,
      description: "Good new task",
      rating: null,
      edit: false
    };

    // copying the previous tasks
    const newTasks = [...this.state.inCompletedTask];
    newTasks.push(aTask);

    this.setState({ inCompletedTask: newTasks });
    console.log("task added. ");
  }

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const newTaskDescription = event.currentTarget.value;
    console.log(newTaskDescription);
    const newTasks = [...this.state.inCompletedTask];
    newTasks[index].description = newTaskDescription;
    this.setState({ inCompletedTask: newTasks });
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>, index: number) => {
    event.preventDefault();
    this.handleEdit(index);
  };

  handleRating = (newValue: number | null, index: number) => {
    const newTasks: TaskProperty[] = [...this.state.inCompletedTask];
    newTasks[index].rating = newValue;

    // when a rating is given it sorts the tasks
    newTasks.sort((a, b) => {
      if ((a.rating != null) && (b.rating != null)) {
        return b.rating - a.rating;
      } else {
        return 0;
      }
    });
    console.log("index: " + index + " rating: " + newValue);
    this.setState({ inCompletedTask: newTasks });
  }


  render() {
    console.log("states are: ", this.state);

    const { classes } = this.props;

    // TextArea for adding tasks
    const editText = this.state.inCompletedTask.map((value, index) => {
      if (value.edit) {
        return (<MultilineTextFields handleChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => this.handleChange(event, index)}
          handleSubmit={(event: React.FormEvent<HTMLFormElement>) => this.handleSubmit(event, index)} />)
      } else
        return null;
    });

    return (
      <div>
        <div style={{ alignContent: "center", margin: "0.5%" }}>
          <AddCircleIcon onClick={this.addTaskHandler} />
          <h3 style={{ margin: "0px" }}>Add a task</h3>
        </div>
        <div style={{ display: "flex" }}>
          {editText}
          <List className={classes.root} subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              New Tasks
        </ListSubheader>
          }>
            {this.state.inCompletedTask.map((value, key) => {
              const labelId = `checkbox-list-label-${value}`;
              return (
                <ListItem key={key} role={undefined} dense button>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={value.check}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                      onClick={this.handleCheck(key)}
                    />
                  </ListItemIcon>
                  <ListItemText disableTypography style={value.check ? { textDecoration: "line-through" } : undefined} id={labelId} primary={value.description} />
                  <ListItemIcon itemID={key + "rating"}>
                    <Rating name={"simple-controlled" + key} value={value.rating} max={3}
                      onChange={(event: React.ChangeEvent<{}>, newValue: number | null) => {
                        console.log("rating key: " + key);
                        this.handleRating(newValue, key)
                      }
                      } />
                  </ListItemIcon>
                  <ListItemSecondaryAction onClick={() => this.handleEdit(key)}>
                    <IconButton edge="end" aria-label="comments" >
                      <CommentIcon />
                    </IconButton >
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
          <List className={classes.root} subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Completed Tasks
           </ListSubheader>
          }>
            {this.state.completedTask.map((value, index) => {
              const labelId = `checkbox-list-label-${value}`;
              return (
                <ListItem key={index} role={undefined} dense button>
                  <ListItemText disableTypography style={value.check ? { textDecoration: "line-through" } : undefined}
                    id={labelId} primary={value.description} />
                  <ListItemText primary={value.date?.toUTCString()} />
                  {/* <p>{value.date?.toUTCString()}</p> */}
                </ListItem>

              );
            })}
          </List>
        </div>
      </div>
    );
  }
}

// "TaskList" is wrapped with "withStyles", so that "styles" is applied at this component
export default withStyles(styles, { withTheme: true })(TaskList);