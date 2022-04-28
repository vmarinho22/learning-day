import nookies, { parseCookies, setCookie } from 'nookies';

const cookies = () => {
  const getCookies = (context: string, ctx = undefined) => {
    let cookies;
    try {
      if (context === 'client') {
        cookies = parseCookies();
        return cookies;
      } if (context === 'server') {
        cookies = nookies.get(ctx);
        return cookies;
      }
      return false;
    } catch (error) {
      console.log('getCookies Error: ', error);
      return undefined;
    }
  };

  const getCookie = (context: string, key: string, ctx = undefined) => {
    let cookies: any;
    try {
      if (context === 'client') {
        cookies = parseCookies();
        return JSON.parse(cookies[key]);
      } if (context === 'server') {
        cookies = nookies.get(ctx);
        return JSON.parse(cookies[key]);
      }
      return {};
    } catch (error) {
      return cookies[key];
    }
  };

  const destroyCookie = (context: string, key: string) => {
    try {
      nookies.destroy(undefined, `hh_${key}`);
      return true;
    } catch (error) {
      return false;
    }
  };

  const setNewCookie = (context: string, key: string, value: any, time = 60 * 60 * 2) => { // default -> 2 hour
    try {
      if (context === 'client') {
        setCookie(undefined, key, value, {
          maxAge: time
        });
        return true;
      } if (context === 'server') {
        nookies.set(undefined, key, value, {
          maxAge: time
        });
        return true;
      }
      return false;
    } catch (error) {
      console.log('setCookie Error: ', error);
      return false;
    }
  };

  return {
    setNewCookie, getCookies, getCookie, destroyCookie
  };
};

export default cookies;
