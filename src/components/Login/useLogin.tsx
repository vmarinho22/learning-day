import api from '@services/api';
import cookies from '@services/cookies';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { SyntheticEvent, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

type LoginReturnType = {
  showPassword: boolean;
  handleClickShowPassword: () => void;
  handleFormSubmit: (event: SyntheticEvent) => Promise<boolean>;
}

type LoginType = () => LoginReturnType;

const useLogin: LoginType = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setNewCookie } = cookies();

  const handleClickShowPassword = (): void => setShowPassword(!showPassword);

  const handleFormSubmit = async (event: SyntheticEvent): Promise<boolean> => {
    event.preventDefault();
    const user = (document.querySelector("#user") as HTMLInputElement).value;
    const password = (document.querySelector("#password") as HTMLInputElement).value;

    const data = {user, password};

    const response: AxiosResponse = await api.post('/auth/login/', data);

    if (response.status !== 200) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        html: "Usuário ou senha incorretos!",
      });
      return false
    }

    setNewCookie('client','token', response.data.token);
    setNewCookie('client', 'user', response.data.user);

    router.push('/home');

    return true;
  };

  return {
    showPassword,
    handleClickShowPassword,
    handleFormSubmit,
  }
};

export default useLogin;