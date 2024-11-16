import { Link } from "react-router-dom";
function BrandLogos({ logo, altText }) {
  return (
    <>
      <Link to={`/productlist/exide`}>
        <div className="brand-card">
          <img src={logo} alt={altText} />
        </div>
      </Link>
    </>
  );
}
export default BrandLogos;
