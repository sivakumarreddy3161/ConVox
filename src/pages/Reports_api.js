import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useEffect } from "react";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import "../styles/tablestyle.css";
const useStyles = makeStyles({
  table: {
    minWidth: "100%",
  },
});

export default function BasicTable() {
  const classes = useStyles();
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);

  const data_table_header = {
    backgroundColor: "#04767b",
    fontFamily: "Arial",
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://192.168.0.88:8088/sample.php")
      .then((res) => {
        setState(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 100);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading)
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Box mb={2}>
        <Typography variant="h5" color="primary">
          Agent Login Details{" "}
        </Typography>
      </Box>
      <TableContainer className="main-table-wrapper" component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={data_table_header}>
            <TableRow>
              <TableCell
                style={{ color: "white", width: "100px", padding: "1px" }}
              >
                Cdr Id
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%", padding: "1px" }}
                align="right"
              >
                Entry Date
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Modified Date
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Phone Number
              </TableCell>

              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Extension
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Uniqueid
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Channel
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Call Referenceno
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Call Type
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                billsec
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Status
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Hangup Cause Code
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Call End Node
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Completed By
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Dialer Status
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Call Mode
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Process{" "}
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Traverse Path
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Did Num
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Route Name
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Ivr Node Duration
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Voicemail Node Duration
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Callforward Node Duration
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Recordingstudio Node Duration
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Queue Node Duration
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Ringing Duration
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Call Connect Time
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Queue Id
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Recording File
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Redial Cdr Callid
              </TableCell>
              <TableCell
                style={{ color: "white", width: "100%" }}
                align="right"
              >
                Server Ip
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.map((item) => (
              <TableRow>
                <TableCell>{item.cdr_id}</TableCell>
                <TableCell
                  style={{ color: "white", width: "100%", padding: "1px" }}
                  align="right"
                >
                  {item.entry_date}
                </TableCell>
                <TableCell align="right">{item.modified_date}</TableCell>
                <TableCell align="right">{item.phone_number}</TableCell>
                <TableCell align="right">{item.extension}</TableCell>
                <TableCell align="right">{item.uniqueid}</TableCell>
                <TableCell align="right">{item.channel}</TableCell>
                <TableCell align="right">{item.call_referenceno}</TableCell>
                <TableCell align="right">{item.call_type}</TableCell>
                <TableCell align="right">{item.billsec}</TableCell>
                <TableCell align="right">{item.status}</TableCell>
                <TableCell align="right">{item.hangup_cause_code}</TableCell>
                <TableCell align="right">{item.call_end_node}</TableCell>
                <TableCell align="right">{item.completed_by}</TableCell>
                <TableCell align="right">{item.dialer_status}</TableCell>
                <TableCell align="right">{item.call_mode}</TableCell>
                <TableCell align="right">{item.process}</TableCell>
                <TableCell align="right">{item.traverse_path}</TableCell>
                <TableCell align="right">{item.did_num}</TableCell>
                <TableCell align="right">{item.route_name}</TableCell>
                <TableCell align="right">{item.ivr_node_duration}</TableCell>
                <TableCell align="right">
                  {item.voicemail_node_duration}
                </TableCell>
                <TableCell align="right">
                  {item.callforward_node_duration}
                </TableCell>
                <TableCell align="right">
                  {item.recordingstudio_node_duration}
                </TableCell>
                <TableCell align="right">{item.allow_offline_crm}</TableCell>
                <TableCell align="right">{item.queue_node_duration}</TableCell>
                <TableCell align="right">{item.ringing_duration}</TableCell>
                <TableCell align="right">{item.call_connect_time}</TableCell>
                <TableCell align="right">{item.queue_id}</TableCell>
                <TableCell align="right">{item.recording_file}</TableCell>
                <TableCell align="right">{item.redial_cdr_callid}</TableCell>
                <TableCell align="right">{item.server_ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
