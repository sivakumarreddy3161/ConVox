import { Grid, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "../styles/tablestyle.css";

function Reports() {
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [processDetails, setProcessDetails] = useState([]);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    axios
      .get(
        "http://192.168.0.88:8088/dumpreport.php?begin_date=2021-01-17 00:00:00&end_date=2021-01-18 23:59:59&process=DeepijaSupport"
      )
      .then((res) => {
        setProcessDetails(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="card_wrapper">
        <div className="card">
          <h1 className="report_title">Dump Report</h1>
          <form>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <TextField
                  id="date"
                  label="Start Date"
                  type="date"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  defaultValue={moment().format("YYYY-MM-DD")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="date"
                  fullWidth
                  variant="outlined"
                  label="End Date"
                  type="date"
                  margin="dense"
                  defaultValue={moment().format("YYYY-MM-DD")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="time"
                  label="Start Time"
                  type="time"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  defaultValue={moment().format("hh:mm:ss")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="time"
                  label="End Time"
                  type="time"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  defaultValue={moment().format("HH:mm:ss")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth margin="dense" variant="outlined">
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Process
                  </InputLabel>
                  <Select
                    native
                    // value={age}
                    onChange={handleChange}
                    label="Process"
                    inputProps={{
                      name: "Process",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option value=""></option>
                    {processDetails.map((item) => (
                      <option value={item.process}>{item.process}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <FormControl fullWidth margin="dense" variant="outlined">
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Dialer Status
                  </InputLabel>
                  <Select
                    native
                    // value={age}
                    label="Dialer Status"
                    onChange={handleChange}
                    inputProps={{
                      name: "age",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={10}>All</option>
                    <option value={20}>Answered</option>
                    <option value={30}>Not-Answered</option>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <div>
                  <Button variant="contained" size="small" color="primary">
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reports;
