import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

type ProductImageSectionProps = {
  index: number;
};

const ProductImageSection = ({ index }: ProductImageSectionProps) => {
  const { control, setValue, watch } = useFormContext();
  const existingProductImageUrl = watch(`Product.${index}.PimageUrl`);
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Set the file in the form data
      setValue(`Product.${index}.PimageFile`, file);
      
      // Read the file and display it preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setValue(`Product.${index}.PimageUrl`, e.target?.result || '');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-8 md:w-[50%]">
        {existingProductImageUrl && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={existingProductImageUrl}
              className="rounded-md object-cover h-full w-full"
              alt={`Product Image`}
            />
          </AspectRatio>
        )}
        <FormField
          control={control}
          name={`Product.${index}.PimageFile`}
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleImageChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ProductImageSection;
