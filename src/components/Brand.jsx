import BrandLogos from "./BrandLogos";
import "./Brand.css";

import Exide from "../assets/logo/exide.png";
import Amaron from "../assets/logo/amaron.png";
import Powerzone from "../assets/logo/powerzone.png";
import Globat from "../assets/logo/globat.png";

const brandData = [
  { logo: Exide, altText: "Exide Logo" },
  { logo: Amaron, altText: "Amaron Logo" },
  { logo: Powerzone, altText: "Powerzone Logo" },
  { logo: Globat, altText: "Globat Logo" },
];
function Brand() {
  return (
    <>
      <div className="top-brands-section">
        <h3 className="section-title">Top Brands</h3>
        <div className="brands-container">
          {brandData.map((brand, index) => (
            <BrandLogos key={index} logo={brand.logo} altText={brand.altText} />
          ))}
        </div>
      </div>
    </>
  );
}
export default Brand;

// function Brand(props) {
//   return (
//     <>
//       <div className="top-brands-section">
//         <h3 className="section-title">Top Brands</h3>
//         <div className="brands-container">
//           <a href="">
//             <div className="brand-card">
//               <img src={props.logoName} alt={props.logoName}"Logo" />
//             </div>
//           </a>
//           <div className="brand-card">
//             <img src={Amaron} alt="Amaron Logo" />
//           </div>
//           <div className="brand-card">
//             <img src={Powerzone} alt="Powerzone Logo" />
//           </div>
//           <div className="brand-card">
//             <img src={Globat} alt="Globat Logo" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// export default Brand;
