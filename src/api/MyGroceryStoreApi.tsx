    import { GroceryStore, Order } from "@/types";
    import { useAuth0 } from "@auth0/auth0-react";
    import { useMutation, useQuery } from "react-query";
    import { toast } from "sonner";

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    export const useGetMyGroceryStore = () => {
        const { getAccessTokenSilently} = useAuth0();

        const getMyGroceryStoreRequest = async (): Promise<GroceryStore>=>{
            const accessToken = await getAccessTokenSilently();

            const response = await fetch(`${API_BASE_URL}/api/my/groceryStore`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if(!response.ok) {
                throw new Error("Failed to get Grocery-Store");
            }
            return response.json();
        };

        const {data: groceryStore, isLoading } = useQuery(
            "fetchMyGroceryStore",
            getMyGroceryStoreRequest
        );

        return {groceryStore, isLoading };
    };

    export const useCreateMyGroceryStore = () => {
        const { getAccessTokenSilently } = useAuth0();

        const createMyGroceryStoreRequest = async(groceryStoreFormData: FormData): Promise<GroceryStore> =>{
            const accessToken = await getAccessTokenSilently();

            const response = await fetch(`${API_BASE_URL}/api/my/groceryStore`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: groceryStoreFormData,
            });

            if(!response.ok) {
                throw new Error("Failed to create Grocery-Store");
            }
            return response.json();
        };

        const { 
            mutate: createGroceryStore,
            isLoading,
            isSuccess,
            error,
        } = useMutation(createMyGroceryStoreRequest);

        if(isSuccess) {
            toast.success("Grocery-Store created");
        }
        if(error) {
            toast.error("Unable to update Grocery-Store");
        }

        return { createGroceryStore, isLoading};
    };



    export const useUpdateMyGroceryStore = () => {
        const { getAccessTokenSilently } = useAuth0();
      
        const updateGroceryStoreRequest = async (
          groceryStoreFormData: FormData
        ): Promise<GroceryStore> => {
          const accessToken = await getAccessTokenSilently();
      
          const response = await fetch(`${API_BASE_URL}/api/my/groceryStore`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: groceryStoreFormData,
          });
      
          if (!response) {
            throw new Error("Failed to update Grocery-Store");
          }
      
          return response.json();
        };
      
        const {
          mutate: updatedGroceryStore,
          isLoading,
          error,
          isSuccess,
        } = useMutation(updateGroceryStoreRequest);
      
        if (isSuccess) {
          toast.success("Grocery-Store Updated");
        }
      
        if (error) {
          toast.error("Unable to update Grocery-Store");
        }
      
        return { updatedGroceryStore, isLoading };
      };

      export const useGetMyGroceryStoreOrders = () => {
        const { getAccessTokenSilently } = useAuth0();
      
        const getMyGroceryStoreOrdersRequest = async (): Promise<Order[]> => {
          const accessToken = await getAccessTokenSilently();
      
          const response = await fetch(`${API_BASE_URL}/api/my/groceryStore/order`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error("Failed to fetch orders");
          }
      
          return response.json();
        };
      
        const { data: orders, isLoading } = useQuery(
          "fetchMyGroceryStoreOrders",
          getMyGroceryStoreOrdersRequest
        );
      
        return { orders, isLoading };
      };
      
      type UpdateOrderStatusRequest = {
        orderId: string;
        status: string;
      };
      
      export const useUpdateMyGroceryStoreOrder = () => {
        const { getAccessTokenSilently } = useAuth0();
      
        const updateMyGroceryStoreOrder = async (
          updateStatusOrderRequest: UpdateOrderStatusRequest
        ) => {
          const accessToken = await getAccessTokenSilently();
      
          const response = await fetch(
            `${API_BASE_URL}/api/my/groceryStore/order/${updateStatusOrderRequest.orderId}/status`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: updateStatusOrderRequest.status }),
            }
          );
      
          if (!response.ok) {
            throw new Error("Failed to update status");
          }
      
          return response.json();
        };
      
        const {
          mutateAsync: updateGroceryStoreStatus,
          isLoading,
          isError,
          isSuccess,
          reset,
        } = useMutation(updateMyGroceryStoreOrder);
      
        if (isSuccess) {
          toast.success("Order updated");
        }
      
        if (isError) {
          toast.error("Unable to update order");
          reset();
        }
      
        return { updateGroceryStoreStatus, isLoading };
      };