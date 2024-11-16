import { useParams } from "react-router-dom";
function ProductList() {
  const params = useParams();
  console.log(params);
  return <div>ProductList </div>;
}
export default ProductList;
