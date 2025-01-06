import "./css/Brand.css";
import { Link } from "react-router-dom";

import Exide from "../assets/logo/exide.png";
import Amaron from "../assets/logo/amaron.png";
import Powerzone from "../assets/logo/powerzone.png";
import Globat from "../assets/logo/globat.png";

const brandData = [
  { logo: Exide, altText: "Exide" },
  { logo: Amaron, altText: "Amaron" },
  { logo: Powerzone, altText: "Powerzone" },
  { logo: Globat, altText: "Globat" },
];
function Brand() {
  return (
    <>
      <div className="top-brands-section">
        <h3 className="section-title">Top Brands</h3>
        <div className="brands-container">
          {brandData.map((brand, index) => (
            <Link to={`/products`}>
              <div className="brand-card">
                <img src={brand.logo} alt={brand.altText} />
              </div>
            </Link>
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
