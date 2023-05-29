import { SVGAttributes } from 'react';

export default function EyeOpen(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="1em"
      height="1em"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 3c4.003 0 7.53 2.102 9.593 5.291a2.53 2.53 0 010 2.75c-2.063 3.19-5.59 5.292-9.593 5.292s-7.53-2.101-9.593-5.29a2.53 2.53 0 010-2.752C2.47 5.101 5.997 3 10 3zm-.012 2.333a4.337 4.337 0 00-4.34 4.334A4.337 4.337 0 009.988 14c2.397 0 4.34-1.94 4.34-4.333a4.337 4.337 0 00-4.34-4.334zm0 1.334a3.002 3.002 0 013.004 3c0 1.657-1.345 3-3.004 3a3.002 3.002 0 01-3.005-3c0-1.657 1.345-3 3.005-3z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
}
