import {
  Box,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "../styles/tablestyle.css";
function Reports() {
  const [processDetails, setProcessDetails] = useState([]);
  const [dumpReports, setDumpreports] = useState({
    crm_headers: [],
    count: "",
    data: "",
  });
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    startDate: "",
    endDate: "",
    process: "",
    dialerStatus: "",
    startTime: "",
  });
  const [value, setValue] = useState(1);

  useEffect(() => {
    axios
      .get(`http://192.168.0.88:8088/process.php`)
      .then((res) => {
        setProcessDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleProcess(e) {
    setState({
      ...state,
      process: e.target.value,
    });
  }
  function handleDialerStatus(e) {
    setState({
      ...state,
      dialerStatus: e.target.value,
    });
  }
  function handleStartDate(e) {
    setState({ ...state, startDate: e.target.value });
  }
  function handleEndDate(e) {
    setState({ ...state, endDate: e.target.value });
  }

  function handleSubmit(e) {
    setValue(1);
    getData();
  }

  function handlePagination(e, v) {
    let offset = v == 1 ? 0 : (v - 1) * 10 + 1;
    setValue(v);
    getData(offset, v);
  }

  function getData(offset = 0) {
    setLoading(true);
    axios
      .get(
        `http://192.168.0.88:8088/dumpreport.php?begin_date=${state.startDate}%2000:00:00&end_date=${state.endDate}%2023:59:59&process=${state.process}&status=${state.dialerStatus}&offset=${offset}`
      )
      .then((res) => {
        setDumpreports({
          crm_headers: res.data.crm_headers,
          count: res.data.count,
          data: res.data.data,
        });
        // console.log(res.data.data);
        setLoading(false);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  const useStyles = makeStyles((theme) => ({
    inputt: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },

    paper: {
      padding: theme.spacing(1),
      margin: theme.spacing(0),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h6"> Dump Reports</Typography>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={3}>
            <Box className={classes.paper}>
              <TextField
                id="date"
                label="Start Date"
                type="date"
                onChange={handleStartDate}
                margin="dense"
                style={{ width: "80%" }}
                size="small"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box className={classes.paper}>
              <TextField
                id="time"
                label="Start Time"
                type="time"
                size="small"
                style={{ width: "80%" }}
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
          <Grid item xs={12} sm={3}>
            <Box className={classes.paper}>
              <TextField
                id="date"
                style={{ width: "80%" }}
                size="small"
                variant="outlined"
                label="End Date"
                onChange={handleEndDate}
                type="date"
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <Box className={classes.paper}>
              <TextField
                id="time"
                label="End Time"
                type="time"
                style={{ width: "80%" }}
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
          <Grid item xs={12} sm={3}>
            <Box className={classes.paper}>
              <FormControl
                style={{ width: "80%" }}
                margin="dense"
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Process
                </InputLabel>
                <Select
                  native
                  value={state.process}
                  onChange={handleProcess}
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
            </Box>
            <Box className={classes.paper}>
              <FormControl
                style={{ width: "80%" }}
                margin="dense"
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Dialer Status
                </InputLabel>
                <Select
                  native
                  value={state.dialerStatus}
                  onChange={handleDialerStatus}
                  label="Dialer Status"
                  inputProps={{
                    name: "Dialer Status",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value="ALL">All</option>
                  <option value="ANSWERED">Answered</option>
                  <option value="NOT-ANSWERED">Not-Answered</option>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box className={classes.paper}></Box>
            <Box className={classes.paper} style={{ paddingTop: "30px" }}>
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>

      {/*  */}

      <Grid container>
        <Grid item xs={12}>
          {loading ? (
            <Box display="flex" mt={3} justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              {dumpReports.data?.length ? (
                <ReportsTable value={value} dumpReports={dumpReports} />
              ) : (
                ""
              )}
            </>
          )}
          {dumpReports.data.length ? (
            <Box mt={3} display="flex" justifyContent="center">
              <Pagination
                color="primary"
                page={value}
                onChange={handlePagination}
                count={
                  dumpReports.count > 10 ? Math.ceil(dumpReports.count / 10) : 1
                }
              />
            </Box>
          ) : null}
        </Grid>
      </Grid>
      {/* </Box> */}
    </div>
  );
}

export default Reports;

function ReportsTable({ dumpReports, value }) {
  function getSerialNumber(index) {
    return value == 1 ? index + 1 : index + 1 + (value - 1) * 10;
  }

  return (
    <Box mt={3} style={{ overflowX: "auto", width: "1200px" }}>
      <table class="my_table">
        <tr className="">
          {/* <th nowrap="nowrap" className="records_count"></th> */}
          <th colSpan="10" style={{ background: "#CDD6D5", color: "#000" }}>
            <span style={{ float: "left" }}>
              No of Records : {dumpReports.count}
            </span>{" "}
            Call Details
          </th>
          <th colSpan="15" style={{ background: "#CDD6D5", color: "#000" }}>
            CRM Details
          </th>
        </tr>
        <tr>
          <th>S.No</th>
          <th>Call Date</th>
          <th nowrap="nowrap">Agent ID</th>
          <th nowrap="nowrap">Customer Name</th>
          <th nowrap="nowrap">Phone Number</th>
          <th nowrap="nowrap">Status</th>
          <th nowrap="nowrap">Sub Status</th>
          <th nowrap="nowrap">Sub-Sub Status</th>
          <th nowrap="nowrap">Duration</th>
          <th nowrap="nowrap">Phone Order No</th>
          <th nowrap="nowrap">Dialer Status</th>
          {dumpReports?.crm_headers?.map((item) => (
            <th nowrap="nowrap">{item}</th>
          ))}
        </tr>

        {dumpReports.data.map((item, index) => (
          <tr>
            <td>{getSerialNumber(index)}</td>
            <td>
              {item.call_time
                ? item.call_time
                : item.talk_epoch
                ? moment.unix(item.talk_epoch).format("YYYY-MM-DD HH:mm:ss")
                : item.entry_date}
            </td>
            <td>{item.agent_id}</td>
            <td>{item.first_name}</td>
            <td>{item.phone_number}</td>
            <td>{item.status}</td>
            <td>{item.sub_status}</td>
            <td>{item.sub_sub_status}</td>
            <td>{item.Duration}</td>
            <td>{item.phone_order_no}</td>
            <td>{item.dialer_status}</td>
            <td>{item.first_name}</td>
            <td>{item.email_id}</td>
            <td>{item.phone_1}</td>
            <td>{item.city}</td>
            <td>{item.comments}</td>
            <td>{item.crm_field_1}</td>
            <td>{item.crm_field_2}</td>
            <td>{item.crm_field_3}</td>
            <td>{item.crm_field_4}</td>
            <td>{item.crm_field_5}</td>
            <td>{item.crm_field_6}</td>
            <td>{item.crm_field_7}</td>
            <td>{item.crm_field_8}</td>
            <td>{item.crm_field_9}</td>
          </tr>
        ))}
      </table>
    </Box>
  );
}
