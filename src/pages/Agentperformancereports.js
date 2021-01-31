import { Box, Grid, TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import FastForwardIcon from "@material-ui/icons/FastForward";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import "../styles/tablestyle.css";

function Reports() {
  const [processDetails, setProcessDetails] = useState([]);
  const [agentDetails, setAgentDetails] = useState([]);
  const [state, setState] = useState({
    process: [],
    agent: [],
  });

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      let processRes = await axios.get(`http://192.168.0.88:8088/process.php`);
      setProcessDetails(processRes.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAgentDetails();
  }, [state.process]);

  async function getAgentDetails() {
    try {
      let agentRes = await axios.get(
        `http://192.168.0.88:8088/agent_details.php?process=${state.process.map(
          (item) => item
        )}`
      );
      setAgentDetails(agentRes.data.data || []);
    } catch (err) {
      console.log(err);
    }
  }

  function handleSubmit(e) {}

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setState({
      ...state,
      process: value,
    });
  };

  return (
    <div>
      <div>
        <Typography variant="h6">Agent Performance Custom Reports</Typography>

        <Grid container spacing={0}>
          <Grid item xs={12} sm={2}>
            <Box>
              <TextField
                id="date"
                label="Start Date"
                type="date"
                margin="dense"
                style={{ width: "90%" }}
                size="small"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="time"
                label="Start Time"
                type="time"
                name="time"
                size="small"
                style={{ width: "90%" }}
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
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box>
              <TextField
                id="date"
                style={{ width: "90%" }}
                size="small"
                variant="outlined"
                label="End Date"
                type="date"
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="time"
                label="End Time"
                type="time"
                style={{ width: "90%" }}
                margin="dense"
                size="small"
                variant="outlined"
                defaultValue={moment().format("HH:mm:ss")}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box width="80%">
              <FormControl fullWidth>
                <InputLabel shrink htmlFor="select-multiple-native">
                  Process
                </InputLabel>
                <Select
                  multiple
                  native
                  style={{ border: "1px solid #000" }}
                  value={state.process}
                  onChange={handleChangeMultiple}
                  inputProps={{
                    id: "select-multiple-native",
                  }}
                >
                  {processDetails.map((item, index) => (
                    <option key={index} value={item.process}>
                      {item.process}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box width="80%">
              <FormControl fullWidth>
                <InputLabel shrink htmlFor="select-multiple-native">
                  Agent
                </InputLabel>
                <Select
                  multiple
                  native
                  style={{ border: "1px solid #000" }}
                  inputProps={{
                    id: "select-multiple-native",
                  }}
                >
                  {agentDetails.map((item, index) => (
                    <option key={index} value={item.agent_id}>
                      {item.agent_id}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Box>
              <Box style={{ paddingTop: "5px" }}>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ padding: "0px" }}
                >
                  <ArrowRightIcon></ArrowRightIcon>
                </Button>
              </Box>
              <Box style={{ paddingTop: "5px" }}>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ padding: "0px" }}
                >
                  <FastForwardIcon></FastForwardIcon>
                </Button>
              </Box>{" "}
              <Box style={{ paddingTop: "5px" }}>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ padding: "0px" }}
                >
                  <ArrowLeftIcon></ArrowLeftIcon>
                </Button>
              </Box>{" "}
              <Box style={{ paddingTop: "5px" }}>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ padding: "0px" }}
                >
                  <FastRewindIcon></FastRewindIcon>
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box width="80%">
              <FormControl fullWidth>
                <InputLabel shrink htmlFor="select-multiple-native">
                  Agent
                </InputLabel>
                <Select
                  multiple
                  native
                  style={{ border: "1px solid #000" }}
                  inputProps={{
                    id: "select-multiple-native",
                  }}
                >
                  {agentDetails.map((item, index) => (
                    <option key={index} value={item.agent_id}>
                      {item.agent_id}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={1} style={{ paddingTop: "40px" }}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Reports;
