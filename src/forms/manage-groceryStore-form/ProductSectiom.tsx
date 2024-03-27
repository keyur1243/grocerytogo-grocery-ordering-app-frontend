import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import ProductInput from "./ProductInput";

const ProductSection = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "Product",
    });

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Product</h2>
                <FormDescription>
                    Add your Product and give each Product a name, a price, a category, and a short description.
                </FormDescription>
            </div>
            <FormField
                control={control}
                name="Product"
                render={() => (
                    <FormItem className="flex flex-col gap-2">
                        {fields.map((field, index) => (
                            <ProductInput
                                key={field.id} // Use a unique identifier as the key
                                index={index}
                                removeProduct={() => remove(index)}
                            />
                        ))}
                    </FormItem>
                )}
            />
            <Button type="button" onClick={() => append({ productName: "", category: "", price: "", description: "" })}>
                Add Product
            </Button>
        </div>
    );
};

export default ProductSection;
