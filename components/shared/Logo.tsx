interface Props {
  size?: number;
}

export function Logo({ size = 22 }: Props) {
  return (
    <img
      src="/logo.svg"
      width={size}
      height={size}
      alt="SmartScale AI logo"
      style={{ display: "block", objectFit: "contain" }}
    />
  );
}
