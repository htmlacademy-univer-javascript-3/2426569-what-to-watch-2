
interface IconProps {
  width: string;
  height: string;
  xlinkHref: string;
}

export function Icon({height, width, xlinkHref}: IconProps) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      <use xlinkHref={xlinkHref}></use>
    </svg>
  );
}
