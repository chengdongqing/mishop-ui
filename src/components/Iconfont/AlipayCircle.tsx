import { SVGAttributes } from 'react';

export default function AlipayCircle(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 46 46"
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.35 25.898c-.543.439-1.125 1.076-1.294 1.886-.23 1.109-.048 2.496 1.021 3.583 1.296 1.32 3.263 1.68 4.112 1.744 2.31.165 4.77-.978 6.626-2.285a14.633 14.633 0 003.162-3.133c-2.667-1.376-5.996-2.898-9.555-2.75-1.818.076-3.12.454-4.072.956zm33.821 6.09A22.878 22.878 0 0046.001 23C46 10.319 35.683 0 23 0S0 10.319 0 23c0 12.684 10.315 23 23 23 7.654 0 14.441-3.761 18.624-9.53-4.82-2.4-9.646-4.785-14.48-7.156-1.916 2.184-4.746 4.372-7.943 5.324-2.01.598-3.822.825-5.715.438-1.875-.383-3.257-1.261-4.062-2.142-.41-.449-.88-1.02-1.222-1.699.032.086.055.137.055.137s-.196-.337-.346-.876a4.202 4.202 0 01-.16-1.401c-.02-.362.005-.726.077-1.081.187-.91.575-1.967 1.58-2.952 2.203-2.157 5.154-2.274 6.684-2.265 2.265.014 6.201 1.005 9.515 2.178.918-1.957 1.507-4.048 1.886-5.44H13.717v-1.49h7.075v-2.982h-8.567v-1.489h8.565v-2.979c0-.41.081-.745.745-.745h3.352v3.724H34.2v1.49h-9.312v2.98h7.45s-.748 4.17-3.088 8.28c5.192 1.854 12.494 4.71 14.92 5.664z"
        fill="#1989fa"
      ></path>
    </svg>
  );
}