export type User = {
    _id: string;
    email: string;
    name: string;
    addressline1: string;
    city: string;
    country: string;
};

export type Product = {
    _id: string;
    productName: string;
    price: number;
    category: string;
    description: string;
};

export type GroceryStore = {
    _id: string;
    user: string;
    groceryStoreName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    categories: string[];
    Product: Product[];
    imageUrl: string;
    lastUpdated: string;
};


export type GroceryStoreSearchResponse = {
    data: GroceryStore[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    };
  };

  export type Order = {
    _id: string;
    groceryStore: GroceryStore;
    user: User;
    cartItems: {
      productId: string;
      productName: string;
      quantity: string;
    }[];
    deliveryDetails: {
      name: string;
      addressLine1: string;
      city: string;
      email: string;
    };
    totalAmount: number;
    
    createdAt: string;
    restaurantId: string;
  };