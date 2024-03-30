import { Product } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  productDetail: Product;
  addToCart:() => void;
};

const ProductDetail = ({productDetail, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart} >
      <CardHeader>
        <CardTitle>{productDetail.productName}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        ${(productDetail.price / 100).toFixed(2)}
      </CardContent>
      <CardContent >
        {productDetail.category}
      </CardContent>
      <CardContent >
        {productDetail.description}
      </CardContent>
    </Card>
  );
};

export default ProductDetail;
