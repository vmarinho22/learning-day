import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack
} from "@mui/material";
import type { FC } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import useLogin from "./useLogin";

const Login: FC = () => {
  const {
    showPassword,
    handleClickShowPassword,
    handleFormSubmit,
  } = useLogin();

  return (
    <form className="w-full">
      <FormControl variant="outlined" fullWidth size="small">
        <InputLabel htmlFor="user">Usuário</InputLabel>
        <OutlinedInput
          id="user"
          size="small"
          label="Usuário"
          fullWidth
          autoComplete="username"
        />
      </FormControl>

      <FormControl variant="outlined" fullWidth size="small" margin="normal">
        <InputLabel htmlFor="password">Senha</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          size="small"
          label="Senha"
          fullWidth
          autoComplete="password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <BiHide /> : <BiShow />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <br />

      <Stack spacing={2} direction="row">
        <Button
          className="w-full mb-1 mt-1 text-base uppercase text-white bg-pr-purple hover:bg-pr-ocean hover:text-black transition ease-in-out delay-50 duration-300"
          variant="contained"
          onClick={handleFormSubmit}
        >
          Entrar
        </Button>
      </Stack>
    </form>
  );
};

export default Login;
