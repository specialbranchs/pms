import React, { useEffect, useState } from 'react'
import { StyledTableCell, StyledTableRow } from '../dashboard/DashboardIndex'
import { Box, Button, ButtonGroup } from '@mui/material'

import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextAreaProps from '../person/component/textAreaProps';
import api from '../../../api';
import { doOnSubscribe } from '../../../utils/rxjs.utils';
import { finalize } from 'rxjs/operators';
import { formatTime, getTime, tConvert } from '../../../utils/timeConvert';
import { status } from '../../../utils/status';
import LoadingButton from '@mui/lab/LoadingButton';
import "./time.css"
import { url } from 'inspector';
type Props = {
    rows: any
}
export const fontFamily = {
    fontFamily: ['Roboto', 'sans-serif'].join(",")
}
const AppointmentList = ({ rows }: Props) => {
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');
    const [timevalue, settimeValue] = React.useState(getTime());
    const [loading, setLoading] = useState(false)
    const [row, setrow] = useState<any>(null)
    const [note, setnote] = useState('')

    useEffect(() => {
        setrow(rows)
    }, [])
    const handleClickOpen = () => {
        setOpen(true);
        setnote(row?.note)
    };

    useEffect(() => {
        settimeValue(getTime())
    }, [open])

    const handleClose = () => {
        setOpen(false);

    };

    const dataHandler = (e: { target: { value: any; id: any }; }) => {
        setnote(e.target.value)
    }
    const updateAppointment = (timevalues: string | null, notes: string, status: number) => {
        api.report
            .updateAppointment$(rows.id, timevalues, notes, status)
            .pipe(
                doOnSubscribe(() => setLoading(true)),
                finalize(() => setLoading(false))
            )
            .subscribe({
                next: async (res) => {
                    // console.log('row', res)
                    setrow(res)
                    setLoading(false)
                    handleClose()
                },
                error: (error: any) => {
                    // console.log(error)
                    setLoading(false)
                }
            });
    }
    console.log(row)
    if (row === null)
        return null
    return (
        <>
            <StyledTableRow key={row?.id}>
                <StyledTableCell component="th" scope="row" sx={fontFamily}>
                    {row?.user?.name}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ color: 'blue', fontFamily: ['Roboto', 'sans-serif'].join(",") }}>{row?.user?.designation?.dig_name}</StyledTableCell>
                <StyledTableCell align="left" sx={fontFamily}>{row?.user?.phone}</StyledTableCell>
                <StyledTableCell align="left" sx={fontFamily}>{row?.reason}</StyledTableCell>
                <StyledTableCell align="left" sx={fontFamily}>{formatTime(row?.created)}</StyledTableCell>
                <StyledTableCell align="left" sx={fontFamily}>{row?.desiredtime}</StyledTableCell>
                <StyledTableCell align="left" sx={fontFamily}>{row?.location.zone}</StyledTableCell>
                <StyledTableCell align="left" sx={{ color: 'green', ...fontFamily }}>{tConvert(row?.appoint_time)}</StyledTableCell>
                <StyledTableCell align="left">{row?.note}</StyledTableCell>
                <StyledTableCell align="left" sx={{ color: status(row?.status).color, ...fontFamily }}>{status(row?.status).statusTxt}</StyledTableCell>
                <StyledTableCell align="center" >
                    <ButtonGroup>
                        <LoadingButton

                            variant="contained"
                            sx={fontFamily}
                            size='small'
                            color="success"
                            onClick={() => handleClickOpen()}
                            loading={loading}
                        >
                            Accept
                        </LoadingButton>

                        <LoadingButton

                            variant="contained" size='small'
                            sx={fontFamily}
                            onClick={() => updateAppointment(null, "", 2)}
                            loading={loading}
                            color='primary'>
                            Pending
                        </LoadingButton>
                        <LoadingButton variant="contained" size='small'
                            onClick={() => updateAppointment(null, "", 3)}
                            loading={loading}
                            sx={fontFamily}
                            color='error'>
                            Reject
                        </LoadingButton>
                        <LoadingButton variant="contained" size='small'
                            onClick={() => updateAppointment(row?.appoint_time
                                , row?.note, 4)}
                            loading={loading}
                            sx={fontFamily}
                            color='secondary'>
                            release
                        </LoadingButton>
                    </ButtonGroup>
                </StyledTableCell>
            </StyledTableRow>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: '#3d495a',
                        color: 'white',
                        ...fontFamily
                    }}
                >
                    Appointment Feedback
                </DialogTitle>
                <DialogContent>

                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            padding: '10px',

                        }}
                    >
                        <DialogContentText sx={{
                            fontFamily: ['Roboto', 'sans-serif'].join(","),
                            fontSize: '15px'
                        }}>
                            Appointment time
                        </DialogContentText>
                        <input type="time"
                            onChange={(e) => settimeValue(e.target.value)}
                            id="apptime"
                            style={{
                                fontFamily: ['RobotoCondensed', 'sans-serif'].join(","),
                                marginBottom: 15,
                                height: 40,
                                borderRadius: 5,
                                border: '1px solid #c1c1c1',
                                marginTop: 5,
                                paddingLeft: 5,

                                background: require("../../../assets/images/logo.png")
                            }}
                            value={timevalue}
                            name="apptime" />

                        <TextAreaProps
                            id={'note'}
                            placeholder={"Note"}
                            label={'Note'}
                            TextAreaChange={dataHandler}
                            error={false}
                            value={note}
                        />

                    </Box>
                </DialogContent>
                <DialogActions sx={{ borderTop: "1px solid #c1c1c1" }}>
                    <LoadingButton
                        variant="contained"
                        size='small'
                        color="success"
                        loading={loading}
                        onClick={() => updateAppointment(timevalue, note, 1)}

                    >Submit</LoadingButton>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AppointmentList
