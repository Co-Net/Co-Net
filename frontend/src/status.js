import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import mainStyles from "./main.module.css";
import Brightness1Icon from "@material-ui/icons/Brightness1";

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  // const [age, setAge] = React.useState('');
  const status = props.status;

  return (
    <div className={mainStyles.centerBio}>
      <FormControl className={mainStyles.statusBar}>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={status}
          displayEmpty
          onChange={props.onStatusChange}
          label="Status"
          className={mainStyles.width300}
        >
          <MenuItem value="" disabled>
            Set Status
          </MenuItem>
          <MenuItem value={"Active"}>
            <Brightness1Icon
              className={mainStyles.statusDot}
              style={{ color: "#26AD00" }}
            ></Brightness1Icon>
            Active
          </MenuItem>
          <MenuItem value={"In-Game"}>
            <Brightness1Icon
              className={mainStyles.statusDot}
              style={{ color: "#4ACFF9" }}
            ></Brightness1Icon>
            In-Game
          </MenuItem>
          <MenuItem value={"Invisible"}>
            <Brightness1Icon
              className={mainStyles.statusDot}
              style={{ color: "#C4C4C4" }}
            ></Brightness1Icon>
            Invisible
          </MenuItem>
          <MenuItem value={"Away"}>
            <Brightness1Icon
              className={mainStyles.statusDot}
              style={{ color: "#FFE614" }}
            ></Brightness1Icon>
            Away
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
