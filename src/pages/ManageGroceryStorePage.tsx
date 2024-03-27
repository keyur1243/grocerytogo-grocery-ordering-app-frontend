import { useCreateMyGroceryStore, useGetMyGroceryStore, useUpdateMyGroceryStore } from "@/api/MyGroceryStoreApi";
import ManageGroceryStoreForm from "@/forms/manage-groceryStore-form/ManageGroceryStoreForm";
  
  const ManageGroceryStorePage = () => {
    const {createGroceryStore, isLoading: isCreateLoading} = useCreateMyGroceryStore();
    const {groceryStore} = useGetMyGroceryStore();
    const {updatedGroceryStore, isLoading: isUpdateLoading} = useUpdateMyGroceryStore();

    const isEditing = !!groceryStore;

    return (
    <ManageGroceryStoreForm 
      groceryStore={groceryStore} 
      onSave={isEditing ? updatedGroceryStore : createGroceryStore} 
      isLoading={isCreateLoading || isUpdateLoading} 
    />
    );
  };
  
  export default ManageGroceryStorePage;