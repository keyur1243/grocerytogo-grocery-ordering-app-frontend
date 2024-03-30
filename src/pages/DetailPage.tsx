import { useGetGroceryStore } from "@/api/GroceryStoreApi";
import GroceryStoreInfo from "@/components/GroceryStoreInfo";
import OrderSummary from "@/components/OrderSummary";
import ProductDetail from "@/components/ProductDetail";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Product as ProductType} from "@/types";
import { Card, CardFooter } from "@/components/ui/card";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
  };



const DetailPage = () => {
  const { groceryStoreId } = useParams();
  const { groceryStore, isLoading } = useGetGroceryStore(groceryStoreId);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${groceryStoreId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  
  const addToCart = (productDetail: ProductType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === productDetail._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === productDetail._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: productDetail._id,
            name: productDetail.productName,
            price: productDetail.price,

            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${groceryStoreId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `cartItems-${groceryStoreId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };


  const onCheckout = async (userFormData: UserFormData) => {
    console.log("UserFormData", userFormData);
  };


  if (isLoading || !groceryStore) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={groceryStore.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <GroceryStoreInfo groceryStore={groceryStore} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {groceryStore.Product.map((productDetail) => (
            <ProductDetail
              productDetail={productDetail}
              addToCart={() => addToCart(productDetail)}
            />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary
              groceryStore={groceryStore}
              cartItems={cartItems} 
              removeFromCart={removeFromCart}
            />
        <CardFooter>
          <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout} 
                isLoading={false}      
           />
        </CardFooter>
          </Card>
        </div>

      </div>
    </div>  
  );
};

export default DetailPage;
