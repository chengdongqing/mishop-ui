import { SVGAttributes } from 'react';

export default function WechatCircle(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 46 46"
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="#50b674">
        <path d="M14.345 17.311a1.505 1.505 0 103.01 0 1.505 1.505 0 00-3.01 0zm6.74-.04a1.505 1.505 0 103.01 0 1.505 1.505 0 00-3.01 0zm3.756 6.732a1.045 1.045 0 102.09 0 1.045 1.045 0 00-2.09 0zm5.31.084a1.045 1.045 0 102.092 0 1.045 1.045 0 00-2.091 0z"></path>
        <path d="M23 0A23.001 23.001 0 006.736 39.263 23 23 0 0046 22.999 22.984 22.984 0 0023 0zm-3.93 28.311c-1.212 0-2.175-.25-3.387-.501l-3.387 1.673.961-2.885c-2.426-1.674-3.849-3.849-3.849-6.525 0-4.601 4.35-8.197 9.662-8.197 4.725 0 8.906 2.886 9.743 6.774a6.763 6.763 0 00-.921-.042c-4.601 0-8.197 3.429-8.197 7.652.01.676.11 1.348.293 1.998-.335 0-.628.042-.92.042zm14.135 3.387l.71 2.426-2.634-1.463c-.961.25-1.924.502-2.885.502-4.601 0-8.199-3.136-8.199-6.974 0-3.837 3.596-6.984 8.196-6.984 4.35 0 8.197 3.136 8.197 6.984 0 2.133-1.423 4.057-3.387 5.52z"></path>
      </g>
    </svg>
  );
}