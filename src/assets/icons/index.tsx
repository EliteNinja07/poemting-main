import React, { CSSProperties } from "react";

interface IconProps {
  className?: string;
  style?: CSSProperties;
  height?: number | string;
  width?: number | string;
  fill?: string;
}

export const LogoIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="90"
      height="90"
      fill="none"
      viewBox="0 0 90 90"
    >
      <rect width="90" height="90" fill="#065F46" rx="20"></rect>
      <path
        fill="#fff"
        d="M73.442 15c-1.97 3.92-11.928 5.207-22.833 8.61-.8 2.504-.83 4.24-1.006 6.89-.6-3.135-.666-4.861-.082-6.561C36.56 28.137 22.61 35.54 19.35 54.089c0 .87-.002 2.604.87 3.473H15.87c1.257 1.25 2.069 2.063 3.398 3.061C28.522 43.248 42.38 32.537 62.296 26.1c.159-.052.323-.079.49-.083a1.751 1.751 0 01.68 3.39C42.642 37.512 30.4 50.295 23.641 63.247c2.347.759 5.544.979 7.938.383l-4.377-4.319c6.108 1.737 9.59.86 20.06-5.22 1.544-.923 6.383-3.929 11.58-8.174-5.346-.475-8.02-.087-13.4-2.405 5.336 1.098 8.324.932 14.352 1.613 9.237-7.762 19.093-19.277 13.646-30.123V15zM62.84 27.766C38.485 35.638 23.698 49.633 15 75l2.61-1.75c5.219-16.619 18.266-34.988 45.23-45.484z"
      ></path>
    </svg>
  );
};

export const Menu = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
};
export const Close = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export const Check = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const Play = ({ fill, height, width }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "40"}
      height={height ?? "40"}
      fill={fill ?? "none"}
      viewBox="0 0 40 40"
    >
      <path
        fill="#059669"
        d="M20.5 3.75A16.25 16.25 0 1036.75 20 16.282 16.282 0 0020.5 3.75zm5.688 17.297l-7.5 5a1.36 1.36 0 01-.688.203c-.206 0-.41-.048-.594-.14A1.25 1.25 0 0116.75 25V15a1.25 1.25 0 01.656-1.11 1.297 1.297 0 011.282.063l7.5 5a1.25 1.25 0 010 2.094z"
      ></path>
    </svg>
  );
};

export const Pause = ({ height, width, fill }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "40"}
      height={height ?? "40"}
      fill={fill ?? "none"}
      viewBox="0 0 40 40"
    >
      <path
        fill="#059669"
        d="M20 3.75A16.25 16.25 0 1036.25 20 16.282 16.282 0 0020 3.75zM17.5 25a1.25 1.25 0 01-2.5 0V15a1.25 1.25 0 012.5 0v10zm7.5 0a1.25 1.25 0 01-2.5 0V15a1.25 1.25 0 012.5 0v10z"
      ></path>
    </svg>
  );
};
