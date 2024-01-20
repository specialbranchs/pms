import { useEffect, useState } from "react";

import api from "../../../api";

import { doOnSubscribe } from "../../../utils/rxjs.utils";
import { finalize } from "rxjs/operators";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppointmentList, { fontFamily } from "../appointment/appointmentList";
import { Box, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { MTmS } from "../../../utils/config";
import colorConfigs from "../../../configs/colorConfigs";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

type Props = {};

const DashboardIndex = () => {
  const [loading, setLoading] = useState(false);
  const [report, setreport] = useState([]);
  const [count, setcount] = useState(0);
  const [reportData, setReportData] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const GetReport = () => {
    setReportData([]);
    api.report
      .getAppointment$(date)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          console.log("user", res);

          setReportData(res);
          setLoading(false);
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };
  useEffect(() => {
    GetReport();
  }, [date]);

  useEffect(() => {
    const interval = setInterval(() => {
      GetReport();
    }, 5 * MTmS);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Box my={1} sx={{ display: "flex", justifyContent: "space-between" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={"Appointment Date"}
            sx={{ width: 200, marginRight: 2, ...fontFamily }}
            slotProps={{ textField: { size: "small" } }}
            onChange={(newValue: Dayjs | null) => {
              if (newValue) {
                setDate(
                  new Date(newValue.add(1, "day").toDate())
                    .toISOString()
                    .slice(0, 10)
                );
                console.log(
                  new Date(newValue.add(1, "day").toDate())
                    .toISOString()
                    .slice(0, 10)
                );
              }
            }}
          />
        </LocalizationProvider>
        <Button variant="outlined"
         sx={{
          ...fontFamily,
          color: colorConfigs.sidebar.activeBg,
          border:`1px solid ${colorConfigs.sidebar.activeBg}`
                  }} 
         onClick={() => GetReport()}>
          Refresh
        </Button>
      </Box>
      <TableContainer
        component={Paper} //sx={{ maxHeight: 440 }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={fontFamily}>Name</StyledTableCell>
              <StyledTableCell align="left" sx={fontFamily}>
                Designation
              </StyledTableCell>
              <StyledTableCell align="left" sx={fontFamily}>
                Phone
              </StyledTableCell>
              <StyledTableCell align="left" sx={fontFamily}>
                Reason
              </StyledTableCell>
              <StyledTableCell align="left" sx={fontFamily}>
                Applied time
              </StyledTableCell>
              <StyledTableCell align="left" sx={fontFamily}>
                Desired time
              </StyledTableCell>
              <StyledTableCell align="left" sx={fontFamily}>
                Location
              </StyledTableCell>
              <StyledTableCell align="left" sx={fontFamily}>
                Appointed time
              </StyledTableCell>
              <StyledTableCell align="left" sx={fontFamily}>
                Note
              </StyledTableCell>
              <StyledTableCell align="left" sx={fontFamily}>
                Status
              </StyledTableCell>
              <StyledTableCell align="center" sx={fontFamily}>
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.map((row) => (
              <AppointmentList rows={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DashboardIndex;
