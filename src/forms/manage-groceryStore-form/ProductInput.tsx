import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeProduct: () => void;
};

const ProductInput = ({ index, removeProduct }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={`Product.${index}.productName`}
        render={({field}) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name 
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Milk"
                className="bg-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`Product.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price ($) 
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="8.00" className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`Product.${index}.category`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Category 
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Dairy" className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`Product.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Description 
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Ashland Glass Milk Bottles With Lids"
                className="bg-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="button"
        onClick={removeProduct}
        className="bg-red-500 max-h-fit"
      >
        Remove
      </Button>
    </div>
  );
};

export default ProductInput;


