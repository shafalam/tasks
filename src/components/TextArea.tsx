import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200 
      },
    },
  }),
);

interface MultilineTextFieldsProps{
  taskId?: number;
  //handleChange(text: string):void;
}

const MultilineTextFields: React.FunctionComponent<MultilineTextFieldsProps> = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(event.target);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off" style={{position: "absolute", zIndex: 2}} onSubmit={(event: React.FormEvent) => handleChange(event)}>
      <div>
        <TextField
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows="4"
          defaultValue="Default Value"
          variant="filled"
        />
        <button type="submit">Add Task</button>
      </div>
    </form>
  );
}

export default MultilineTextFields;