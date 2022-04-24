import api from '@services/api';
import cookies from '@services/cookies';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const useLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setCookie } = cookies();

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
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        html: "Usuário ou senha incorretos!",
      });
      return false
    }

    setCookie('token', response.data.token);
    setCookie('user', response.data.user);

    router.push('/home');
  };

  return {
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleFormSubmit,
  }
};

export default useLogin;