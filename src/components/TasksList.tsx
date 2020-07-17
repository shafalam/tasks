import React from "react";
import { Theme, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import Rating from "@material-ui/lab/Rating";

// icon import
import AddCircleIcon from "@material-ui/icons/AddCircle";

// import custom components
import MultilineTextFields from "./TextArea";

const styles = (theme: Theme) => ({
  root: {
    width: "100%",
    maxWidth: "360em",
    backgroundColor: theme.palette.background.paper,
  },
});

interface TaskProperty {
  check: boolean;
  description: string;
  rating: number | null;
  edit: boolean;
  date?: Date;
}

// for styles
interface TaskListProps {
  classes: any;
}

const TaskList = (props: TaskListProps) => {
  const aTask: TaskProperty[] = [];
  const bTask: TaskProperty[] = [];

  const [completedTasks, setCompletedTasks] = React.useState(aTask);
  const [inCompletedTasks, setInCompletedTasks] = React.useState(bTask);

  const handleCheck = (index: number) => () => {
    const newTasks = [...inCompletedTasks];
    const thatTask = newTasks[index];
    const taskCheck = newTasks[index].check;
    thatTask.check = !taskCheck;
    thatTask.date = new Date();
    const newCompletedTasks = [...completedTasks];

    newCompletedTasks.push(thatTask);
    newTasks.splice(index, 1);
    setCompletedTasks(newCompletedTasks);
    setInCompletedTasks(newTasks);
  };

  const handleEdit = (index: number) => {
    const initialEditStatus = inCompletedTasks[index].edit;
    const newTasks = [...inCompletedTasks];
    newTasks[index].edit = !initialEditStatus;
    setInCompletedTasks(newTasks);
  };

  const addTaskHandler = () => {
    const aTask: TaskProperty = {
      check: false,
      description: "Good new task",
      rating: null,
      edit: false,
    };

    // copying the previous tasks
    const newTasks = [...inCompletedTasks];
    newTasks.push(aTask);
    setInCompletedTasks(newTasks);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newTaskDescription = event.currentTarget.value;
    console.log(newTaskDescription);
    const newTasks = [...inCompletedTasks];
    newTasks[index].description = newTaskDescription;
    setInCompletedTasks(newTasks);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    index: number
  ) => {
    event.preventDefault();
    handleEdit(index);
  };

  const handleRating = (newValue: number | null, index: number) => {
    const newTasks: TaskProperty[] = [...inCompletedTasks];
    newTasks[index].rating = newValue;

    // when a rating is given it sorts the tasks
    newTasks.sort((a, b) => {
      if (a.rating != null && b.rating != null) {
        return b.rating - a.rating;
      } else {
        return 0;
      }
    });
    console.log("index: " + index + " rating: " + newValue);
    setInCompletedTasks(newTasks);
  };

  const { classes } = props;

  // TextArea for adding tasks
  const editText = inCompletedTasks.map((value, index) => {
    if (value.edit) {
      return (
        <MultilineTextFields
          handleChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleChange(event, index)
          }
          handleSubmit={(event: React.FormEvent<HTMLFormElement>) =>
            handleSubmit(event, index)
          }
        />
      );
    } else return null;
  });

  return (
    <div>
      <div style={{ alignContent: "center", margin: "0.5%" }}>
        <AddCircleIcon onClick={addTaskHandler} />
        <h3 style={{ margin: "0px" }}>Add a task</h3>
      </div>
      <div style={{ display: "flex" }}>
        {editText}
        <List
          className={classes.root}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              New Tasks
            </ListSubheader>
          }
        >
          {inCompletedTasks.map((value, key) => {
            const labelId = `checkbox-list-label-${value}`;
            return (
              <ListItem key={key} role={undefined} dense button>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={value.check}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                    onClick={handleCheck(key)}
                  />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  style={
                    value.check ? { textDecoration: "line-through" } : undefined
                  }
                  id={labelId}
                  primary={value.description}
                />
                <ListItemIcon itemID={key + "rating"}>
                  <Rating
                    name={"simple-controlled" + key}
                    value={value.rating}
                    max={3}
                    onChange={(
                      event: React.ChangeEvent<{}>,
                      newValue: number | null
                    ) => {
                      console.log("rating key: " + key);
                      handleRating(newValue, key);
                    }}
                  />
                </ListItemIcon>
                <ListItemSecondaryAction onClick={() => handleEdit(key)}>
                  <IconButton edge="end" aria-label="comments">
                    <CommentIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <List
          className={classes.root}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Completed Tasks
            </ListSubheader>
          }
        >
          {completedTasks.map((value, index) => {
            const labelId = `checkbox-list-label-${value}`;
            return (
              <ListItem key={index} role={undefined} dense button>
                <ListItemText
                  disableTypography
                  style={
                    value.check ? { textDecoration: "line-through" } : undefined
                  }
                  id={labelId}
                  primary={value.description}
                />
                <ListItemText primary={value.date?.toUTCString()} />
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
};

// "TaskList" is wrapped with "withStyles", so that "styles" is applied at this component
export default withStyles(styles, { withTheme: true })(TaskList);
