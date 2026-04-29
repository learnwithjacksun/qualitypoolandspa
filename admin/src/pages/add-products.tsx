import { useState, useEffect } from "react";
import axios from "axios";
import { MainLayout } from "../layouts";
import { InputWithIcon, ButtonWithLoader } from "../components/ui";
import { Package, FileText, DollarSign, Image as ImageIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  categoryId: z.string().min(1, "Please select a category"),
  description: z.string().optional(),
  price: z.string().optional(),
  image: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function AddProduct() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        toast.error("Failed to fetch categories");
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/products`, {
        ...data,
        categoryId: parseInt(data.categoryId),
        price: data.price ? parseFloat(data.price) : null,
      });
      toast.success("Product added successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="main max-w-2xl mx-auto py-8">
        <div className="space-y-2 mb-8">
          <h2 className="text-2xl font-space font-semibold text-primary">Add New Product</h2>
          <p className="text-sm text-main/75">Fill in the details below to add a new product to your catalog.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-2xl border border-line shadow-sm">
          <InputWithIcon
            icon={<Package size={18} className="text-muted" />}
            label="Product Name"
            placeholder="e.g. Deluxe Hot Tub"
            {...register("name")}
            error={errors.name?.message}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-main">Category</label>
            {isLoadingCategories ? (
               <div className="h-11 flex items-center bg-secondary rounded-lg px-4 gap-2 text-muted text-sm border border-line">
                  <Loader2 size={16} className="animate-spin" />
                  Loading categories...
               </div>
            ) : (
              <select 
                {...register("categoryId")}
                className={`w-full h-11 rounded-lg border bg-secondary px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.categoryId ? 'border-red-500' : 'border-line'}`}
              >
                <option value="">Select a category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            )}
            {errors.categoryId && <p className="text-xs text-red-500">{errors.categoryId.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWithIcon
              icon={<DollarSign size={18} className="text-muted" />}
              label="Price (Optional)"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("price")}
              error={errors.price?.message}
            />
            <InputWithIcon
              icon={<ImageIcon size={18} className="text-muted" />}
              label="Image URL (Optional)"
              placeholder="https://..."
              {...register("image")}
              error={errors.image?.message}
            />
          </div>

          <div className="space-y-2">
             <label className="text-sm font-medium text-main flex items-center gap-2">
               <FileText size={18} className="text-muted" />
               Description (Optional)
             </label>
             <textarea 
               {...register("description")}
               className="w-full min-h-[120px] rounded-lg border border-line bg-secondary p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
               placeholder="Enter product description..."
             />
          </div>

          <ButtonWithLoader
            initialText="Add Product"
            loadingText="Adding Product..."
            loading={isSubmitting}
            type="submit"
            className="w-full h-12 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.01]"
          />
        </form>
      </div>
    </MainLayout>
  );
}
