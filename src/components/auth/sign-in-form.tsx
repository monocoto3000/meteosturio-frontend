'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';



type Values = any;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({});

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmit = (async (): Promise<void> => {

    const value = { email, password } satisfies Values;
    const { error } = await authClient.signInWithPassword(value);

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
  });

 
  return (
    <Grid container spacing={2} direction={'row'}>
      <Grid item xs={12} lg={6}>
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', p: 3 }}>
            <Box sx={{ maxWidth: '450px', width: '100%' }}>
              <Stack spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h4">Iniciar sesión</Typography>
                  <Typography color="text.secondary" variant="body2">
                    No tienes una cuenta ?{' '}
                    <Link component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
                      Regístrate
                    </Link>
                  </Typography>
                </Stack>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={2}>
                    <FormControl error={Boolean(errors.email)}>
                      <InputLabel>Correo</InputLabel>
                      <OutlinedInput label="Email address" type="email" value={email} onChange={handleEmailChange} />
                    </FormControl>

                    <FormControl error={Boolean(errors.password)}>
                      <InputLabel>Contraseña</InputLabel>
                      <OutlinedInput
                        value={password}
                        onChange={handlePasswordChange}
                        endAdornment={
                          showPassword ? (
                            <EyeIcon
                              cursor="pointer"
                              fontSize="var(--icon-fontSize-md)"
                              onClick={(): void => {
                                setShowPassword(false);
                              }}
                            />
                          ) : (
                            <EyeSlashIcon
                              cursor="pointer"
                              fontSize="var(--icon-fontSize-md)"
                              onClick={(): void => {
                                setShowPassword(true);
                              }}
                            />
                          )
                        }
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                      />
                    </FormControl>

                    {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
                    <Button disabled={isPending} type="submit" variant="contained">
                      Iniciar sesión
                    </Button>
                  
                  </Stack>
                </form>
                <Alert color="warning">
                  Datos de prueba:{' '}
                  <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
                    sofia@devias.io
                  </Typography>{' '}
                  con la contraseña{' '}
                  <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
                    Secret1
                  </Typography>
                </Alert>
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
