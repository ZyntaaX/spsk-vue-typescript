import Cookies from 'js-cookie';

export function setCookie(key: string, value: any, options?: Cookies.CookieAttributes) {
  const useOptions = options ?? { expires: (15 / 1440), secure: true } // 15 minutes. 1440 is amount of minutes per day.
  Cookies.set(key, value, useOptions); 
}

export function getCookie(key: string) {
  return Cookies.get(key);
}

export function removeCookie(key: string, options?: Cookies.CookieAttributes) {
  Cookies.remove(key, options);
}
