import { useLocation } from 'react-router-dom';

export const useTypeInPath = (arg = 2): Record<string, string | undefined> => {
  const { pathname } = useLocation();
  const splitedArr = pathname.split('/');

  return { type: splitedArr[splitedArr.length - arg] };
};
