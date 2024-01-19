import { Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, FormControl, FormLabel, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TextAreaProps from '../person/component/textAreaProps'
import { LoadingButton } from '@mui/lab'
import { getTime } from '../../../utils/timeConvert'
import api from '../../../api'
import { doOnSubscribe } from '../../../utils/rxjs.utils'
import { finalize } from 'rxjs/operators'
import { PatientAppType } from '../../../../typings/formData'
import { fontFamily } from '../appointment/appointmentList'
import useZoneList from '../../../hooks/useZone'

const AppModal = ({ user, open, handleClose, setapp }: any) => {
    const { zoneLists } = useZoneList()
    const [loading, setLoading] = useState(false)
    const [reason, setreason] = useState('')
    const [desiredtime, setdesirdtime] = useState(getTime())
    const [location, setlocation] = useState<any>(0)
    const [other, setother] = useState('')
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

    useEffect(() => {
        setdesirdtime(getTime())
    }, [open])

    const SubmitAppointment = () => {
        if (reason === '') {
            alert("select your reason")
            return
        }
        if (!user?.id)
            return
        const date = new Date().toISOString().slice(0, 10)
        api.report.CreateSingleAppointment$(user?.id, reason, location, other,desiredtime, date)
            .pipe(
                doOnSubscribe(() => setLoading(true)),
                finalize(() => setLoading(false))
            )
            .subscribe({
                next: async (res) => {
                    // console.log('createsinglerow', res)
                    setapp(res)
                    handleClose()

                },
                error: (error: any) => {
                    // console.log(error)
                    setLoading(false)
                }
            });
    }
    
   
    return (
        <Dialog
            fullWidth={true}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle sx={{
                backgroundColor: '#3d495a',
                color: 'white',
                ...fontFamily
            }}
            >Appointment</DialogTitle>
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
                    <TextAreaProps
                        id={'reason'}
                        placeholder={"Reason"}
                        label={'Reason'}
                        TextAreaChange={(e: any) => setreason(e.target.value)}
                        error={false}
                        value={reason}
                    />

                    <FormControl sx={{ marginTop: 2 }}>
                        <FormLabel sx={{fontSize:'12px',...fontFamily}}>Desired Time</FormLabel>
                        <input type="time"
                            onChange={(e) => setdesirdtime(e.target.value)}
                            id="apptime"
                            style={{
                                fontFamily: ['Roboto', 'sans-serif'].join(","),
                                marginBottom: 15,
                                height: 40,
                                borderRadius: 5,
                                border: '1px solid #97c3f0',
                                marginTop: 5,
                                paddingLeft: 5
                            }}
                            value={desiredtime}
                            name="apptime" />
                    </FormControl>

                    <FormControl sx={{ mr: 1, my: 1 }} fullWidth >
                        <InputLabel  sx={{fontSize:'16px',...fontFamily}} id="demo-simple-select-label">Location</InputLabel>
                        <Select
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={location}
                            label="Designation"
                            onChange={(e) => {
                                setlocation(e.target.value)
                            }}
                        >

                            {
                                zoneLists.map(item => (
                                    <MenuItem value={item.id}>{item.zone}</MenuItem>
                                ))
                            }
                        </Select>
                       
                    </FormControl>

                </Box>
            </DialogContent>
            <DialogActions sx={{ borderTop: "1px solid #c1c1c1" }}>
                <LoadingButton
                    variant="contained"
                    size='small'
                    color="success"
                    loading={loading}
                    onClick={() => SubmitAppointment()}

                >Submit</LoadingButton>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AppModal
