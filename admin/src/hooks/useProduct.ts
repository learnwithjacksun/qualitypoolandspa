import type { AxiosError } from "axios";
import { toast } from "sonner";
import { toBase64 } from "../helpers/toBase64String";
import type { ProductSchema } from "../schemas/product";
import api from "../config/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function useProduct() {
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const createProduct = async (data: ProductSchema, image: File | null) => {
        setIsLoading(true);
        try {
            if (!image) {
                toast.error("Please upload a product image")
                return false
            }
            const base64Image = await toBase64(image);
            const payload = {
                name: data.name,
                categoryId: data.category,
                description: data.description,
                price: data.price,
                image: base64Image,
            }

            const response = await api.post("/products", payload)
            if (response.data.success) {
                toast.success(response.data.message)
                queryClient.invalidateQueries({ queryKey: ["products"] })
                navigate("/products")
                return true
            }

        } catch (error: unknown) {
            console.log(error);
            toast.error((error as AxiosError<{ message: string }>).response?.data.message)
            return false
        } finally {
            setIsLoading(false);
        }

    }

    const updateProduct = async (id: string, data: ProductSchema, image: File | null, existingImage: string | null) => {
        setIsLoading(true);
        try {
            let imageFile = null

            if (image) {
                imageFile = await toBase64(image);
            }
            const payload = {
                name: data.name,
                categoryId: data.category,
                description: data.description,
                price: data.price,
                image: imageFile ?? existingImage,
            }

            const response = await api.patch(`/products/${id}`, payload)
            if (response.data.success) {
                toast.success(response.data.message)
                queryClient.invalidateQueries({ queryKey: ["products"] })
                return true
            }
        } catch (error: unknown) {
            console.log(error);
            toast.error((error as AxiosError<{ message: string }>).response?.data.message)
            return false
        } finally {
            setIsLoading(false);
        }
    }


    const deleteProduct = async (id: string) => {
        setIsLoading(true);
        try {
            const response = await api.delete(`/products/${id}`)
            if (response.data.success) {
                toast.success(response.data.message)
                queryClient.invalidateQueries({ queryKey: ["products"] })
            }
        }
        catch (error: unknown) {
            console.log(error);
            toast.error((error as AxiosError<{ message: string }>).response?.data.message)
        } finally {
            setIsLoading(false);
        }
    }


    const getProducts = async () => {
        const response = await api.get("/products")
        return response.data.products

    }

    const { data: products, isLoading: isLoadingProducts } = useQuery<IProduct[]>({
        queryKey: ["products"],
        queryFn: getProducts,
    })

    return {
        createProduct,
        isLoading,
        products,
        isLoadingProducts,
        deleteProduct,
        updateProduct,
    }
}