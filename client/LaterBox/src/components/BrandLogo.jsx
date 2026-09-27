import mark from "../assets/laterbox-mark.svg";

function BrandLogo({ className = "", markSize = "h-8 w-8", textClassName = "text-base" }) {
  return (
    <span className={`inline-flex items-center gap-2 font-semibold text-white ${className}`}>
      <img src={mark} alt="" aria-hidden="true" className={`${markSize} shrink-0`} />
      <span className={textClassName}>LaterBox</span>
    </span>
  );
}

export default BrandLogo;
