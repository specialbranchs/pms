import { TextField, FormControl, FormGroup, FormControlLabel, Switch, Toolbar } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import { PASSWORD_MIN_LENGTH } from "../../../utils/config";
import { UploadDoctorUserData, UploadUserData } from "../../../../typings/formData";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import api from "../../../api";
import { doOnSubscribe } from "../../../utils/rxjs.utils";
import { finalize } from "rxjs/operators";
type Props = {
    AllUser: any
}
const AddUserScreen = ({ AllUser }: Props) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        bpNumber: Yup.string().required("bpNumber is Required"),
        name: Yup.string().required("Name is Required"),
        email: Yup.string().required("Email is Required"),
        phone: Yup.string().required("Phone Number is Required"),
        password: Yup.string()
            .min(PASSWORD_MIN_LENGTH, `Must be at least ${PASSWORD_MIN_LENGTH}`)
            .required("Password is required"),
        is_admin: Yup.boolean(),
        is_staff: Yup.boolean()
    });
    const initialValues: UploadDoctorUserData = {
        bpNumber: "",
        name: '',
        email: '',
        phone: "",
        sbid:"",
        // designation:0,
        password: '123456',
        is_admin: true,
        is_staff: true
    }
    const formik = useFormik({
        // enableReinitialize,
        initialValues,
        validationSchema,
        onSubmit: (values) => {

            setLoading(true)

            api.auth
                .signUpRequest$(values)
                .pipe(
                    doOnSubscribe(() => setLoading(true)),
                    finalize(() => setLoading(false))
                )
                .subscribe({
                    next: async (res) => {
                        // console.log('res', res)
                        alert('created successfully')

                        AllUser()
                        setLoading(false)
                        formik.resetForm()
                    },
                    error: (error: any) => {

                        alert(error?.response?.data?.email)
                        setLoading(false)
                    }
                });
        }
    })



    return (
        <Toolbar sx={{
            boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important;",
            backgroundColor: 'white',
            padding: 2
        }}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl fullWidth variant="standard" sx={{ mr: 1, my: 1 }} >

                    <TextField
                        fullWidth
                        size='small'
                        id="bpNumber"
                        name="bpNumber"
                        label="bpNumber"
                        value={formik.values.bpNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.bpNumber && Boolean(formik.errors.bpNumber)}
                        helperText={formik.touched.bpNumber && formik.errors.bpNumber}
                    />
                </FormControl>
                <FormControl fullWidth variant="standard" sx={{ mr: 1, my: 1 }} >
                    <TextField
                        fullWidth
                        size='small'
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </FormControl>
                <FormControl fullWidth variant="standard" sx={{ mr: 1, my: 1 }}>
                    <TextField
                        fullWidth
                        size='small'
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </FormControl>

                <FormControl fullWidth variant="standard" sx={{ mr: 1, my: 1 }} >

                    <TextField
                        fullWidth
                        size='small'
                        id="phone"
                        name="phone"
                        label="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                </FormControl>

                <FormControl fullWidth variant="standard" sx={{ mr: 1, my: 1 }}>
                    <TextField
                        fullWidth
                        size='small'
                        id="password"
                        name="password"
                        label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </FormControl>
                <FormGroup sx={{ my: 1 }}>
                    <FormControlLabel
                        control={<Switch
                            value={formik.values.is_admin}
                            defaultChecked
                            checked={formik.values.is_admin}
                            onChange={(e: any) => {
                                if (e.target.checked) {
                                    formik.setFieldValue('is_admin', e.target.checked)
                                    formik.setFieldValue('is_staff', e.target.checked)
                                } else {
                                    formik.setFieldValue('is_admin', e.target.checked)
                                    formik.setFieldValue('is_staff', true)
                                }

                            }}
                            size="small" />}
                        label="Admin" />

                </FormGroup>


                <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                >
                    SUMBIT
                </LoadingButton>
            </form>

        </Toolbar>
    );
};

export default AddUserScreen;
