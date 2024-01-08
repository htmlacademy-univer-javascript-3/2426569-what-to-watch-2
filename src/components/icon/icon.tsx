
interface IconProps {
  width: string;
  height: string;
  xlinkHref: string;
}

export function Icon({height, width, xlinkHref}: IconProps) {
  return (
    <svg data-testid='icon' viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      <use data-testid='use' xlinkHref={xlinkHref}></use>
    </svg>
  );
}
