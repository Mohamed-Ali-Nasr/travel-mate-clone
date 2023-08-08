interface Props {
  className?: string;
  fill?: string;
}

const Logo = ({ className, fill }: Props) => {
  const fillColor = fill ? fill : "#ffffff";

  return (
    <div className={`${className ? className : ""} w-fit`}>
      <svg viewBox="0 0 370.18518518518516 93.0231024319104" className="h-full">
        <g
          transform="matrix(8.352424343182552,0,0,8.352424343182552,0.8237878284087241,-74.02538443174063)"
          fill={fillColor}
        >
          <path d="M0.5 10.06 l7.76 0 l0 3.58 l-1.94 0 l0 6.36 l-3.88 0 l0 -6.36 l-1.94 0 l0 -3.58 l0 0 z"></path>
        </g>
        <g
          transform="matrix(2.318578597527108,0,0,2.318578597527108,84.8608851404224,20.717556193020034)"
          fill={fillColor}
        >
          <path d="M6.7 8.98 l0.02 1.48 l0 9.54 q-0.68 0.12 -1.62 0.12 t-1.58 -0.12 l0 -11.02 l-1.28 0.02 l-2.06 0 q-0.12 -0.58 -0.12 -1.33 t0.12 -1.33 l9.9 0 q0.16 0.52 0.16 1.26 t-0.4 1.07 t-1.28 0.33 l-0.58 0 l-1.26 -0.02 l-0.02 0 z M21.520000000000003 10.56 q0 0.66 -0.2 1.25 t-0.53 1.06 t-0.78 0.82 t-0.93 0.53 q1.04 0.38 1.54 1.84 l0.6 1.7 q0.34 1 1 1.48 q-0.3 0.4 -0.9 0.67 t-1.32 0.27 t-1.12 -0.41 t-0.74 -1.43 l-0.72 -2.1 q-0.22 -0.6 -0.59 -0.92 t-1.11 -0.32 l-0.82 0 l0 5 q-0.64 0.12 -1.6 0.12 t-1.58 -0.12 l0 -13.56 l0.14 -0.14 q1.74 -0.04 2.93 -0.06 t1.87 -0.02 q1.1 0 2 0.27 t1.53 0.81 t0.98 1.36 t0.35 1.9 z M14.900000000000002 8.62 l0 3.92 q0.9 0 1.54 -0.03 t1.03 -0.24 t0.59 -0.59 t0.2 -1.1 q0 -1.94 -1.88 -1.94 l-0.83 0 t-0.65 -0.02 z M27.34 17.14 q-0.54 0 -0.8 -0.02 l-0.86 2.9 q-0.48 0.12 -1.34 0.12 q-0.96 0 -1.56 -0.22 l-0.1 -0.16 l4.4 -13.42 q0.78 -0.12 1.82 -0.12 q1.18 0 1.88 0.14 l4.32 13.44 q-0.7 0.38 -1.58 0.38 q-1.04 0 -1.46 -0.36 t-0.72 -1.38 l-0.38 -1.32 q-0.26 0.02 -0.78 0.02 l-2.84 0 z M27.28 14.620000000000001 l0.8 -0.02 l1.46 0 q0.1 0 0.35 0.01 t0.37 0.01 l-0.34 -1.24 q-0.48 -1.68 -1.1 -4.12 l-0.12 0 q-0.16 0.86 -0.96 3.82 z M40.599999999999994 17.32 l2.62 -10.98 q0.48 -0.12 1.24 -0.12 q1.04 0 1.64 0.22 l0.12 0.16 l-3.74 13.4 q-1.14 0.12 -2.29 0.12 t-1.66 -0.29 t-0.77 -1.15 l-3.32 -12.06 q1.08 -0.46 1.78 -0.46 q0.84 0 1.24 0.38 t0.62 1.2 l1.54 5.7 q0.36 1.34 0.76 3.64 q0.04 0.24 0.22 0.24 z M51.03999999999999 15.96 l-0.02 1.44 l0 0.02 q0.92 -0.04 1.48 -0.04 l4.64 0 q0 0.74 -0.06 1.14 q-0.24 1.54 -2.04 1.54 l-5.32 0 q-0.86 0 -1.35 -0.5 t-0.49 -1.36 l0 -11.72 l0.14 -0.14 l8.62 0 q0.12 0.58 0.12 1.26 t-0.28 1.42 l-5.46 0 l0.02 1.44 l0 1.4 q0.52 -0.02 1.36 -0.02 l3.06 0 q0.18 0.56 0.18 1.28 t-0.18 1.32 l-4.42 0 l0 1.52 z M64.42 17.3 l3.46 0 q0 0.8 -0.1 1.37 t-0.64 0.98 t-1.42 0.41 l-4.52 0 q-0.86 0 -1.36 -0.5 t-0.5 -1.36 l0 -11.86 l0.14 -0.14 l1.18 0 q1.88 0 1.88 2.04 l0 9.14 q0.88 -0.08 1.88 -0.08 z M73.78 19.96 l1.06 -13.6 q0.88 -0.16 2.08 -0.16 t2.1 0.16 l1.18 4.9 q0.7 3.32 0.74 3.62 l0.14 0 q0.08 -0.5 0.74 -3.62 l1.2 -4.9 q0.88 -0.16 2.08 -0.16 t2.1 0.16 l1.06 13.6 q-0.62 0.16 -1.53 0.16 t-1.49 -0.1 l-0.32 -5.56 q-0.14 -3.32 -0.16 -4.62 l-0.12 0 l-1.98 8.14 q-0.72 0.12 -1.65 0.12 t-1.65 -0.12 l-1.96 -8.14 l-0.14 0 q0 1.78 -0.16 4.62 l-0.3 5.56 q-0.58 0.1 -1.49 0.1 t-1.53 -0.16 z M94.18 17.14 q-0.54 0 -0.8 -0.02 l-0.86 2.9 q-0.48 0.12 -1.34 0.12 q-0.96 0 -1.56 -0.22 l-0.1 -0.16 l4.4 -13.42 q0.78 -0.12 1.82 -0.12 q1.18 0 1.88 0.14 l4.32 13.44 q-0.7 0.38 -1.58 0.38 q-1.04 0 -1.46 -0.36 t-0.72 -1.38 l-0.38 -1.32 q-0.26 0.02 -0.78 0.02 l-2.84 0 z M94.12 14.620000000000001 l0.8 -0.02 l1.46 0 q0.1 0 0.35 0.01 t0.37 0.01 l-0.34 -1.24 q-0.48 -1.68 -1.1 -4.12 l-0.12 0 q-0.16 0.86 -0.96 3.82 z M108.80000000000001 8.98 l0.02 1.48 l0 9.54 q-0.68 0.12 -1.62 0.12 t-1.58 -0.12 l0 -11.02 l-1.28 0.02 l-2.06 0 q-0.12 -0.58 -0.12 -1.33 t0.12 -1.33 l9.9 0 q0.16 0.52 0.16 1.26 t-0.4 1.07 t-1.28 0.33 l-0.58 0 l-1.26 -0.02 l-0.02 0 z M116.96000000000001 15.96 l-0.02 1.44 l0 0.02 q0.92 -0.04 1.48 -0.04 l4.64 0 q0 0.74 -0.06 1.14 q-0.24 1.54 -2.04 1.54 l-5.32 0 q-0.86 0 -1.35 -0.5 t-0.49 -1.36 l0 -11.72 l0.14 -0.14 l8.62 0 q0.12 0.58 0.12 1.26 t-0.28 1.42 l-5.46 0 l0.02 1.44 l0 1.4 q0.52 -0.02 1.36 -0.02 l3.06 0 q0.18 0.56 0.18 1.28 t-0.18 1.32 l-4.42 0 l0 1.52 z"></path>
        </g>
      </svg>
    </div>
  );
};

export default Logo;
