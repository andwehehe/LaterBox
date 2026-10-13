import laterboxLogo from "../../public/laterbox-icon.svg";

function BrandLogo({ className = "", markSize = "h-8 w-8", textClassName = "text-base" }) {
  return (
    <span className={`inline-flex items-center gap-2 leading-none font-semibold text-white ${className}`}>
      <img src={laterboxLogo} alt="LaterBox logo" className={`${markSize} shrink-0 object-contain align-middle`} />
      <span className={`${textClassName} inline-flex items-center leading-none tracking-tight`}>LaterBox</span>
    </span>
  );
}

export default BrandLogo;
