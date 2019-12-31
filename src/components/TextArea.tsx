import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(0),
        width: 200,
        backgroundColor: theme.palette.background.default 
      },
    },
  }),
);

interface MultilineTextFieldsProps{
  taskId?: number;
  handleChange(event: React.ChangeEvent<HTMLTextAreaElement>):void;
  handleSubmit(event: React.FormEvent<HTMLFormElement>): void;
}

const MultilineTextFields: React.FunctionComponent<MultilineTextFieldsProps> = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  


  return (
    <form className={classes.root} noValidate autoComplete="off" style={{position: "absolute", zIndex: 2}} onSubmit={props.handleSubmit}>
      <div>
        <TextField
          id="filled-multiline-static"
          label="Task"
          multiline
          rows="5"
          defaultValue=""
          variant="filled"
          onChange={props.handleChange}
        />
      </div>
      <button type="submit">Add Task</button>   
    </form>
  );
}

export default MultilineTextFields;