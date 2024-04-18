'use client';

import * as React from 'react';
import { useState } from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Autocomplete, Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import TextField from '@mui/material/TextField';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  firstName: zod.string().min(1, { message: 'Nombre es requerido' }),
  first_last_name: zod.string().min(1, { message: 'Apellido paterno es requerido' }),
  second_last_name: zod.string().min(1, { message: 'Apellido materno es requerido' }),
  type_id: zod.string().min(1, { message: 'El tipo de cuenta es requerido' }),
  birthdate: zod.string().min(1, { message: 'la fecha de cumpleaños es requerido' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  firstName: '',
  birthdate: '',
  type_id: '',
  second_last_name: '',
  first_last_name: '',
  email: '',
  password: '',
  terms: false,
};
export function SignUpForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

  const top100Films = [
    { label: 'Estacion Suchiapa', year: 1 },
   
  ];

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [isRegistered, SetIsRegistred] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.signUp(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      // Refresh the auth state
      await checkSession?.();

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.refresh();
    },
    [checkSession, router, setError]
  );

  return (
    <Grid container spacing={2} direction={'row'}>
      <Grid item xs={12} lg={6}>
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', p: 3 }}>
            <Box sx={{ maxWidth: '450px', width: '100%' }}>
              <Stack spacing={3}>
                <Stack spacing={1}>
                  <Typography variant="h4">Registrarse</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Ya tienes una cuenta?{' '}
                    <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
                      Inicia sesión
                    </Link>
                  </Typography>
                </Stack>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={2}>
                    <Controller
                      control={control}
                      name="firstName"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.firstName)}>
                          <InputLabel>Nombre</InputLabel>
                          <OutlinedInput {...field} label="Nombre" />
                          {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
                        </FormControl>
                      )}
                    />
                    <Controller
                      control={control}
                      name="first_last_name"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.first_last_name)}>
                          <InputLabel>Apellido paterno</InputLabel>
                          <OutlinedInput {...field} label="Apellido paterno" />
                          {errors.first_last_name ? (
                            <FormHelperText>{errors.first_last_name.message}</FormHelperText>
                          ) : null}
                        </FormControl>
                      )}
                    />
                    <Controller
                      control={control}
                      name="second_last_name"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.second_last_name)}>
                          <InputLabel>Apellido materno</InputLabel>
                          <OutlinedInput {...field} label="Apellido materno" />
                          {errors.second_last_name ? (
                            <FormHelperText>{errors.second_last_name.message}</FormHelperText>
                          ) : null}
                        </FormControl>
                      )}
                    />
                    <Controller
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.email)}>
                          <InputLabel>Correo</InputLabel>
                          <OutlinedInput {...field} label="Last name" />
                          {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                        </FormControl>
                      )}
                    />
                    <Controller
                      control={control}
                      name="type_id"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.type_id)}>
                          <InputLabel>Tipo De Cuenta</InputLabel>
                          <OutlinedInput {...field} label="Last name" />
                          {errors.type_id ? <FormHelperText>{errors.type_id.message}</FormHelperText> : null}
                        </FormControl>
                      )}
                    />
                    <Controller
                      control={control}
                      name="birthdate"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.birthdate)}>
                          <InputLabel>Fecha De Nacimiento</InputLabel>
                          <OutlinedInput {...field} label="Last name" />
                          {errors.birthdate ? <FormHelperText>{errors.birthdate.message}</FormHelperText> : null}
                        </FormControl>
                      )}
                    />
                    <Controller
                      control={control}
                      name="password"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.password)}>
                          <InputLabel>Contraseña</InputLabel>
                          <OutlinedInput {...field} label="password address" type="password" />
                          {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                        </FormControl>
                      )}
                    />

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
  );
}
