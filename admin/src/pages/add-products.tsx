import { useEffect, useState } from "react";
import { MainLayout } from "../layouts";
import { ButtonWithLoader, InputWithoutIcon, SelectWithoutIcon } from "../components/ui";
import { Image as ImageIcon, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductSchema } from "../schemas/product";
import { useProduct } from "../hooks";
import { productCategories } from "../constant/data";

export default function AddProduct() {
  const { createProduct, isLoading } = useProduct();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (selectedFiles.length === 0) return;
    setImages(selectedFiles);
    setImagePreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
  });

 

  const onSubmit = async (data: ProductSchema) => {
    const success = await createProduct(data, images);
    if (success) {
      reset();
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
      setImages([]);
      setImagePreviews([]);
    }
  };

  return (
    <MainLayout>
      <div className="main max-w-2xl mx-auto py-8">
        <div className="space-y-2 mb-8">
          <h2 className="text-2xl font-space font-semibold text-primary">
            Add New Product
          </h2>
          <p className="text-sm text-main/75">
            Fill in the details below to add a new product to your catalog.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label htmlFor="image" className="cursor-pointer">
              <input
                type="file"
                name="image"
                id="image"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              {images.length === 0 && imagePreviews.length === 0 ? (
                <div className="flex items-center justify-center flex-col gap-2 min-h-[200px] border-dashed border-2 border-line rounded-lg p-4">
                  <ImageIcon size={18} className="text-muted" />
                  <p className="text-sm text-main">Upload Product Images</p>
                  <p className="text-xs text-main/75">Max file size: 5MB</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {imagePreviews.map((preview) => (
                      <div
                        key={preview}
                        className="h-40 w-full rounded-lg overflow-hidden relative"
                      >
                        <img
                          src={preview}
                          alt="Selected product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
                      setImages([]);
                      setImagePreviews([]);
                    }}
                    type="button"
                    className="bg-black/80 text-white rounded-full p-2"
                  >
                    <Trash2 size={18} className="text-red-500" /> Remove Images
                  </button>
                </div>
              )}
            </label>
          </div>

          <div className="space-y-6">
            <InputWithoutIcon
              type="text"
              label="Product Name"
              placeholder="Enter product name..."
              {...register("name")}
              error={errors.name?.message}
            />

            <SelectWithoutIcon
              label="Category"
              options={productCategories.map((category) => ({
                label: category.name,
                value: category.slug,
              }))}
              {...register("category")}
              error={errors.category?.message}
              />

            <InputWithoutIcon
              label="Price in Euro (Optional)"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("price")}
              error={errors.price?.message}
            />

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-main"
              >
                Description (Optional)
              </label>
              <textarea
                id="description"
                {...register("description")}
                className="w-full min-h-[120px] rounded-lg border border-line bg-secondary p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Enter product description..."
              />
            </div>
            <ButtonWithLoader
              initialText="Add Product"
              loadingText="Adding Product..."
              loading={isLoading}
              type="submit"
              className="w-full h-12 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.01]"
            />
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
