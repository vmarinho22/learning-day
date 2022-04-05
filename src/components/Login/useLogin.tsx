import api from '@services/api';
import { useState } from 'react';

const useLogin = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword: any = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword: any = (event: any) => {
    event.preventDefault();
  };

  const handleFormSubmit: any = async (event: any) => {
    event.preventDefault();
    const user = (document.querySelector("#user") as HTMLInputElement).value;
    const password = (document.querySelector("#password") as HTMLInputElement).value;

    const data = {user, password};

    const response = await api.post('/auth/login/', data);

    if (response.status !== 200) {
      return false
    }

    // TODO: Criar hook de cookie

    console.log(response);
  };

  return {
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleFormSubmit,
  }
};

export default useLogin;