'use client';

import React from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import { OutlinedInput } from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import { margin } from "@mui/system";
import { Autocomplete } from '@mui/material';

export function SignUpForm(): React.JSX.Element {
  const userType = ['EMPRESARIAL', 'INDIVIDUAL'];
  const baseUrl = "URL";
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          first_last_name: "",
          second_last_name: "",
          birthdate: "",
          type_id: ""
        }}
        onSubmit={async (values) => {
          try {
            console.log(values);
            axios.post(baseUrl, {
              name: values.name,
              email: values.email,
              password: values.password,
              first_last_name: values.first_last_name,
              second_last_name: values.second_last_name,
              birthdate: values.birthdate,
              type_id: values.type_id
            }).then((response) => {
              if (response.data !== "") {
                alert("Usuario creado exitosamente");
                window.location.href = "http://localhost:3000/dashboard";
              } else {
                console.log("El Usuario fue creado :)");
              }
            });
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, values, setFieldValue }) => (
          <form
            style={{
              margin: 20,
            }}
            onSubmit={handleSubmit}
          >
            <Grid
              container
              spacing={0}
              direction={"row"}
              sx={{
                justifyContent: "left",
              }}
            >
              <div
                style={{
                  width: "50%",
                  boxShadow: "-5px 6px 32px -3px rgba(0,0,0,0.2)",
                  borderColor: "#65717d",
                  flexDirection: "column",
                  borderRadius: "5px",
                  color: "white",
                  marginTop: "30px",
                  padding: "40px"
                }}
              >
                <div className="containerRegister">
                  <div className="padreImg">
                    <div className="containerImgLogin"></div>
                  </div>

<<<<<<< HEAD
                    {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
                    <Button disabled={isPending}  variant="contained" type='submit' >
                      Registrarse
                    </Button>
                    <Button onClick={SetIsRegistred}>
                      hole
                    </Button>

                    {isRegistered && 
                     <Autocomplete
                     disablePortal
                     id="combo-box-demo"
                     options={top100Films}
                     sx={{ width: "100%" }}
                     renderInput={(params) => <TextField {...params} label="Movie" />}
                   />
                    }
                  </Stack>
                </form>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} lg={6}>
        <img src="/assets/auth-widgets.png" alt="img" width={'100%'} height={'100%'} />
      </Grid>
    </Grid>
=======
                  <div className="containerFormRegister">
                    <div>
                      <Typography
                        style={{
                          fontSize: "40px",
                          color: "black",
                          marginBottom: "20px"
                        }}
                      >
                        Registarse
                      </Typography>
                    </div>
                    <Grid
                      container
                      direction={"row"}
                      spacing={2}
                      sx={{
                        width: "90%",
                      }}
                    >
                      <Grid item xs={12} lg={12}>
                        <TextField
                          label="Nombre"
                          id="name"
                          multiline
                          required
                          value={values.name}
                          onChange={handleChange}
                          error={Boolean(errors.name)}
                          helperText={errors.name}
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <TextField
                          label="Apellido Paterno"
                          id="first_last_name"
                          multiline
                          required
                          value={values.first_last_name}
                          onChange={handleChange}
                          error={Boolean(errors.first_last_name)}
                          helperText={errors.first_last_name}
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <TextField
                          label="Apellido Materno"
                          id="second_last_name"
                          multiline
                          required
                          value={values.second_last_name}
                          onChange={handleChange}
                          error={Boolean(errors.second_last_name)}
                          helperText={errors.second_last_name}
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <TextField
                          label="Correo Electrónico"
                          id="email"
                          multiline
                          required
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          error={Boolean(errors.email)}
                          helperText={errors.email}
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <TextField
                          label="Contraseña"
                          id="password"
                          type="password"
                          required
                          value={values.password}
                          onChange={handleChange}
                          error={Boolean(errors.password)}
                          helperText={errors.password}
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <TextField
                          fullWidth
                          id="birthdate"
                          type="date"
                          value={values.birthdate}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <Autocomplete
                          disablePortal
                          id="estadoCivil"
                          options={userType}
                          getOptionLabel={(option) => (typeof option === 'string' || option instanceof String ? option : '')}
                          required
                          onChange={(e, value) => {
                            console.log(value);
                            setFieldValue('type_id', value !== null ? value : values.type_id);
                          }}
                          sx={{ width: '100%' }}
                          renderInput={(params) => <TextField {...params} label="Estado Civil" />}
                        />
                      </Grid>
                    </Grid>
                    <div
                      style={{
                        marginTop: "5px",
                      }}
                    >
                      <Stack spacing={2} direction="row">
                        <Button variant="contained" type="submit">
                          Registrarse
                        </Button>
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>
              <Grid item xs={6} lg={6}>
                <img src="/assets/auth-widgets.png" alt="img" height={'100%'} />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
>>>>>>> 682ba7cedcfd42811a17fd9d1984663244e96761
  );

}
