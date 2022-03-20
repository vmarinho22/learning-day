import { useState } from 'react';

const useLogin = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword: any = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword: any = (event: any) => {
    event.preventDefault();
  };

  const handleFormSubmit: any = (event: any) => {
    event.preventDefault();
    const user = (document.querySelector("#user") as HTMLInputElement).value;
    const password = (document.querySelector("#password") as HTMLInputElement).value;
  };

  return {
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleFormSubmit,
  }
};

export default useLogin;