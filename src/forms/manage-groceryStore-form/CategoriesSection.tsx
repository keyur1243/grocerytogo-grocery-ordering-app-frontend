import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import CategoryCheckbox from "./CategoryCheckbox";
import { categoryList } from "@/config/groceryStore-option-config";

const CategoriesSection = () => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Categories</h2>
                <FormDescription>
                    Select the categories of products that your grocery store offers
                </FormDescription>
            </div>
            <FormField
                control={control}
                name="categories"
                render={({ field }) => (
                    <FormItem>
                        <div className="grid md:grid-cols-5 gap-1">
                            {categoryList.map((categoryItem, index) => (
                                <CategoryCheckbox key={index} category={categoryItem} field={field} />
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default CategoriesSection;
