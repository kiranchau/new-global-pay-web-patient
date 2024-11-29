import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {MenuItem} from '@material-ui/core/MenuItem';
import {FormHelperText} from '@material-ui/core/FormHelperText';
import {FormControl} from '@material-ui/core/FormControl';
import {Select} from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function SelectBox() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className='select-dropdown-wrap'>
      <FormControl className='select-dropdown-form'>
        <Select
          className='select-dropdown'
          onChange={(e) => {
            this.selectedStudies(e);
          }}

        >
          
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

    </div>
  );
}
