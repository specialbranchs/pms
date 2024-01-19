import { useState } from "react";
import { PASSWORD_MIN_LENGTH } from "../../../utils/config";
import { UploadUserData } from "../../../../typings/formData";
import * as Yup from "yup";
import { useFormik } from "formik";
import api from "../../../api";
import { doOnSubscribe } from "../../../utils/rxjs.utils";
import { finalize } from "rxjs";
import { Avatar, Box, FormControl, FormHelperText, Grid, InputLabel, Link, MenuItem, Select, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import assets from "../../../assets";
import colorConfigs from "../../../configs/colorConfigs";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useDesignation from "../../../hooks/useDesignation";


const Register = (props: any) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const { designations } = useDesignation()

  const validationSchema = Yup.object().shape({
    bpNumber: Yup.string().required("bpNumber is Required"),
    name: Yup.string().required("Name is Required"),
    email: Yup.string().required("Email is Required"),
    phone: Yup.string().required("Phone Number is Required"),
    sbid: Yup.string().required(" SB ID is Required"),
    designation: Yup.number().test('selection', 'Designation Required', (number) => number !== 0),
    password: Yup.string()
      .min(PASSWORD_MIN_LENGTH, `Must be at least ${PASSWORD_MIN_LENGTH}`)
      .required("Password is required"),
    is_admin: Yup.boolean(),
    is_staff: Yup.boolean()
  });
  const initialValues: UploadUserData = {
    bpNumber: "",
    name: '',
    email: '',
    phone: "",
    sbid: "",
    designation: 0,
    password: '123456',
    is_admin: false,
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
            setLoading(false)
            formik.resetForm()
            navigate('/')
          },
          error: (error: any) => {

            alert(error?.response?.data?.email)
            setLoading(false)
          }
        });
    }
  })

  // console.log(formik.values)

  return (
    <>

      <Grid container marginTop={6}>
        <Grid xs={6} md={6} sx={{
          justifyContent: 'center',
          alignItems: 'center',
          display: {
            xs:'none',
            sm:'none',
            md:'flex',
            lg:'flex',
            xl:'flex'

          }

        }}>
          <Box>
            <Avatar src={assets.images.banner}
              sx={{
                height: 350,
                width: 500
              }}
              variant="square" />
          </Box>
        </Grid>
        <Grid xs={12} md={6}
          sx={{
            display: 'flex',
            justifyContent:'center'
          }}
        >

          <form onSubmit={formik.handleSubmit}>
            <Toolbar sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom sx={{
                  color: colorConfigs.sidebar.bg,
                  letterSpacing: 2,
                  fontSize: '25px',
                  fontFamily: ['Raleway', 'sans-serif'].join(",")
                }}>
                  SignUP with BP Number
                </Typography>
                <Box sx={{ backgroundColor: '#1976d2', width: '30px', height: '15px', marginLeft: "20px", borderRadius: '3px' }} />
                <Box sx={{ backgroundColor: '#1976d2', width: '30px', height: '15px', marginInline: 1, borderRadius: '3px' }} />
                <Box sx={{ backgroundColor: '#1976d2', width: '30px', height: '15px', borderRadius: '3px' }} />
              </Box>
              <Typography variant="h4" gutterBottom sx={{
                color: 'red',
                fontSize: 12,
                fontFamily: ['Raleway', 'sans-serif'].join(",")
              }}>
                {/* {error} */}
              </Typography>

              <FormControl fullWidth variant="standard" sx={{ mr: 1, my: 1 }} >

                <TextField

                  fullWidth
                  size='small'
                  id="bpNumber"
                  name="bpNumber"
                  label="Enter a valid BP Number"
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
                  id="sbid"
                  name="sbid"
                  label="Enter a valid SB ID"
                  value={formik.values.sbid}
                  onChange={formik.handleChange}
                  error={formik.touched.sbid && Boolean(formik.errors.sbid)}
                  helperText={formik.touched.sbid && formik.errors.sbid}
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

              <FormControl sx={{ mr: 1, my: 1 }} fullWidth error={formik.touched.designation && Boolean(formik.errors.designation)}>
                <InputLabel id="demo-simple-select-label">Designation</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.designation}
                  label="Designation"
                  onChange={(e) => {
                    formik.setFieldValue('designation', e.target.value)
                  }}
                >

                  {
                    designations.map(item => (
                      <MenuItem value={item.id}>{item.dig_name}</MenuItem>
                    ))
                  }
                </Select>
                <FormHelperText>{formik.touched.designation && formik.errors.designation}</FormHelperText>
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
                  type="password"
                  disabled
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </FormControl>


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

              <Toolbar>
                <Link variant="body2">
                  {"Already have an account? "}
                </Link>

                <Link href="#" variant="body2" sx={{ marginLeft: 2 }}>

                  <NavLink to={'/'}>
                    SIGNIN
                  </NavLink>
                </Link>
              </Toolbar>
            </Toolbar>
          </form>



        </Grid>
      </Grid>

    </>
  );
};

export default Register;




