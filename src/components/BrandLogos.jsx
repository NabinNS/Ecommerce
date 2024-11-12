function BrandLogos({ logo, altText }) {
  return (
    <>
      <a href="">
        <div className="brand-card">
          <img src={logo} alt={altText} />
        </div>
      </a>
    </>
  );
}
export default BrandLogos;
