import { useCreateMyGroceryStore, useGetMyGroceryStore, useGetMyGroceryStoreOrders, useUpdateMyGroceryStore } from "@/api/MyGroceryStoreApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageGroceryStoreForm from "@/forms/manage-groceryStore-form/ManageGroceryStoreForm";
  
  const ManageGroceryStorePage = () => {
    const {createGroceryStore, isLoading: isCreateLoading} = useCreateMyGroceryStore();
    const {groceryStore} = useGetMyGroceryStore();
    const {updatedGroceryStore, isLoading: isUpdateLoading} = useUpdateMyGroceryStore();

    const { orders } = useGetMyGroceryStoreOrders();

    const isEditing = !!groceryStore;

    return (
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-groceryStore">Manage GroceryStore</TabsTrigger>
        </TabsList>
        <TabsContent
          value="orders"
          className="space-y-5 bg-gray-50 p-10 rounded-lg"
        >
          <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
          {orders?.map((order) => (
            <OrderItemCard order={order} />
          ))}
        </TabsContent>
        <TabsContent value="manage-groceryStore">
          <ManageGroceryStoreForm
            groceryStore={groceryStore}
            onSave={isEditing ? updatedGroceryStore : createGroceryStore}
            isLoading={isCreateLoading || isUpdateLoading}
          />
        </TabsContent>
      </Tabs>
    );
  };
  
  export default ManageGroceryStorePage;