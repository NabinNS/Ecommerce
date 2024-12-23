import { Link } from "react-router-dom";
function BrandLogos({ logo, altText }) {
  return (
    <>
      <Link to={`/products`}>
        <div className="brand-card">
          <img src={logo} alt={altText} />
        </div>
      </Link>
    </>
  );
}
export default BrandLogos;
