import { useEffect, useMemo, useState } from "react";
import { MainLayout } from "../layouts";
import { ButtonWithLoader, InputWithoutIcon, SelectWithoutIcon } from "../components/ui";
import { Image as ImageIcon, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductSchema } from "../schemas/product";
import { useProduct } from "../hooks";
import { productCategories } from "../constant/data";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products = [], isLoadingProducts, updateProduct, isLoading } = useProduct();
  const [image, setImage] = useState<File | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);

  const product = useMemo(() => {
    return products.find((item) => item.id === id) ?? null;
  }, [id, products]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (!product) return;

    reset({
      name: product.name,
      category: product.categoryId,
      description: product.description ?? "",
      price: String(product.price ?? ""),
    });
  }, [product, reset]);

  useEffect(() => {
    return () => {
      if (selectedImagePreview) {
        URL.revokeObjectURL(selectedImagePreview);
      }
    };
  }, [selectedImagePreview]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImage(file);
    setSelectedImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: ProductSchema) => {
    if (!id) return;
    const success = await updateProduct(id, data, image);
    if (success) {
      navigate(`/products/${id}`);
    }
  };

  const imagePreview = selectedImagePreview ?? product?.image ?? null;

  return (
    <MainLayout>
      <div className="main max-w-2xl mx-auto py-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-space font-semibold text-primary">
              Edit Product
            </h2>
            <p className="text-sm text-main/75">
              Update product details and optionally replace the image.
            </p>
          </div>
          <Link
            to={id ? `/products/${id}` : "/products"}
            className="rounded-full border border-line bg-background px-4 py-2 text-sm font-medium text-main transition-colors hover:bg-secondary"
          >
            Cancel
          </Link>
        </div>

        {isLoadingProducts ? (
          <div className="rounded-2xl border border-line bg-background px-6 py-10 text-center">
            <p className="text-base font-semibold text-primary">Loading product...</p>
          </div>
        ) : !product ? (
          <div className="rounded-2xl border border-dashed border-line bg-background px-6 py-10 text-center">
            <p className="text-base font-semibold text-primary">Product not found</p>
            <p className="mt-1 text-sm text-muted">
              The product may have been deleted or the link is invalid.
            </p>
          </div>
        ) : (
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
                  onChange={handleImageChange}
                />

                {!imagePreview ? (
                  <div className="flex items-center justify-center flex-col gap-2 min-h-[200px] border-dashed border-2 border-line rounded-lg p-4">
                    <ImageIcon size={18} className="text-muted" />
                    <p className="text-sm text-main">Upload Product Image</p>
                    <p className="text-xs text-main/75">Max file size: 5MB</p>
                  </div>
                ) : (
                  <div className="h-[400px] max-h-[400px] w-full rounded-lg overflow-hidden relative">
                    <img
                      src={imagePreview}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        setImage(null);
                        setSelectedImagePreview(null);
                      }}
                      type="button"
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white rounded-full p-2"
                    >
                      <Trash2 size={18} className="text-red-500" /> Reset Image
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
                initialText="Update Product"
                loadingText="Updating Product..."
                loading={isLoading}
                type="submit"
                className="w-full h-12 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.01]"
              />
            </div>
          </form>
        )}
      </div>
    </MainLayout>
  );
}
