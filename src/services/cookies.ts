import nookies from 'nookies';

const cookies = () => {
  const setCookie = (key: string, value: string, time: number = 60 * 60 * 6, path: string = '') => { // default -> 2 hour
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
      return undefined;
    }
  };

  const getCookie = (key: string, ctx: any = undefined) => {
    let cookies;
    try {
        cookies = nookies.get(ctx);
        return JSON.parse(cookies[key]);
    } catch (error) {
      console.log('getCookie Error: ', error);
      return undefined;
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
