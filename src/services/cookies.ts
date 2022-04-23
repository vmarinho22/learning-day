import nookies from 'nookies';

const cookies = () => {
  const setCookie = (key: string, value: string, time: number = 60 * 60 * 6, path: string | undefined = undefined) => { // default -> 2 hour
    try {
        nookies.set(undefined, key, value, {
          maxAge: time,
          path
        });
        return true;
    } catch (error) {
      console.log('setCookie Error: ', error);
      return false;
    }
  };

  const getCookies = (ctx = undefined) => {
    let cookies;
    try {
        cookies = nookies.get(ctx);
        return cookies;
    } catch (error) {
      console.log('getCookies Error: ', error);
      return {};
    }
  };

  const getCookie = (key: string, ctx: any = undefined) => {
    let cookies;
    cookies = nookies.get(ctx);
    try {
      return JSON.parse(cookies[key]);
    } catch (error) {
      return cookies[key];
    }
  };

  const destroyCookie = (key: string) => {
    try {
        nookies.destroy(undefined, `${key}`);
        return true;
    } catch (error) {
      console.log('destroyCookie Error: ', error);
      return false;
    }
  };

  return {
    setCookie, getCookies, getCookie, destroyCookie
  };
};

export default cookies;
