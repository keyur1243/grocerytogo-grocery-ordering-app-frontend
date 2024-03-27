 import { Form } from "@/components/ui/form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { useForm } from "react-hook-form";
 import { z } from "zod";
 import DetailsSection from "./DetailsSection";
 import { Separator } from "@/components/ui/separator";
 import CategoriesSection from "./CategoriesSection";
 import ProductSection from "./ProductSectiom";
 import ImageSection from "./ImageSection";
 import LoadingButton from "@/components/LoadingButton";
 import { Button } from "@/components/ui/button";
import { GroceryStore } from "@/types";
import { useEffect } from "react";


 const formSchema = z.object({
     groceryStoreName: z.string({
         required_error: "Grocery-Store name is required",
     }),
     city: z.string({
         required_error: "City is required",
     }),
     country: z.string({
         required_error: "Country is required",
     }),
     deliveryPrice: z.coerce.number({
         required_error: "delivery price is required",
         invalid_type_error: "must be a valid number",
     }),
     estimatedDeliveryTime: z.coerce.number({
         required_error: "Estimated delivery time is required",
         invalid_type_error: "must be a valid number",
     }),
     categories: z.array(z.string()).nonempty({
         message: "please select at least one category",
     }),
     Product: z.array(z.object({
         productName: z.string().min(1,"Product name is required"),
         category: z.string().min(1, "category is required"),    
         price: z.coerce.number().min(1, "Price is required"),   
         description: z.string().min(1, "Product description is required"), 
     })
     ),
     imageUrl: z.string().optional(),
     imageFile: z.instanceof(File, {message: "Image is required"}).optional(),
 })
 .refine((data)=> data.imageUrl || data.imageFile, {
    message: "Either image URL or Image File must be provided",
    path: ["imageFile"],
 });

 type GroceryStoreFormData = z.infer<typeof formSchema>

type Props = {
    groceryStore?: GroceryStore;
    onSave: (groceryStoreFormData: FormData) => void;
    isLoading: boolean;
};

const ManageGroceryStoreForm = ({onSave, isLoading, groceryStore}: Props) => {
     const form = useForm<GroceryStoreFormData>({
         resolver: zodResolver(formSchema),
         defaultValues: {
             categories: [],
             Product: [{ productName: "", category: "", price: 0, description: "" }],
        
         },
     });


     useEffect(() => {
        if (!groceryStore) {
          return;
        }

        const deliveryPriceFormatted = parseInt(
            (groceryStore.deliveryPrice / 100).toFixed(2)
          );
      
          const ProductFormatted = groceryStore.Product.map((item) => ({
            ...item,
            price: parseInt((item.price / 100).toFixed(2)),
          }));

         const updatedGroceryStore = {
            ...groceryStore,
            deliveryPrice: deliveryPriceFormatted,
            Product: ProductFormatted,
         };

         form.reset(updatedGroceryStore);
        }, [form, groceryStore]);

         const onSubmit = (formDatajason: GroceryStoreFormData)=> {
             const formData = new FormData();

             formData.append("groceryStoreName", formDatajason.groceryStoreName);
             formData.append("city", formDatajason.city);
             formData.append("country", formDatajason.country);
            
             formData.append("deliveryPrice", (formDatajason.deliveryPrice * 100).toString());
             formData.append("estimatedDeliveryTime", formDatajason.estimatedDeliveryTime.toString());
             formDatajason.categories.forEach((category, index) => {
                 formData.append(`categories[${index}]`, category);
             });
             formDatajason.Product.forEach((Product, index) => {
                 formData.append(`Product[${index}][productName]`, Product.productName);
                 formData.append(`Product[${index}][category]`, Product.category);
                 formData.append(`Product[${index}][price]`, (Product.price * 100).toString());
                 formData.append(`Product[${index}][description]`, Product.description);
             });
             if(formDatajason.imageFile){
             formData.append(`imageFile`,formDatajason.imageFile);
             }
             onSave(formData);
         };

     return(
         <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
             <DetailsSection/>
             <Separator />
             <CategoriesSection />
             <Separator />
             <ProductSection />
             <Separator />
             <ImageSection />
             {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
             </form>
         </Form>
     )
 };

export default ManageGroceryStoreForm;