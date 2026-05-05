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

    const createProduct = async (
        data: ProductSchema,
        images: File[],
        colorSampleImageFile: File | null = null,
    ) => {
        setIsLoading(true);
        try {
            if (images.length === 0) {
                toast.error("Please upload at least one product image")
                return false
            }
            const base64Images = await Promise.all(images.map((file) => toBase64(file)));
            const payload: Record<string, unknown> = {
                name: data.name,
                categoryId: data.category,
                description: data.description,
                price: data.price,
                images: base64Images,
            }
            if (colorSampleImageFile) {
                payload.colorSampleImage = await toBase64(colorSampleImageFile);
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

    const updateProduct = async (
        id: string,
        data: ProductSchema,
        images: File[],
        colorSampleImageFile: File | null = null,
    ) => {
        setIsLoading(true);
        try {
            const payload: Record<string, unknown> = {
                name: data.name,
                categoryId: data.category,
                description: data.description,
                price: data.price,
            }
            if (images.length > 0) {
                const base64Images = await Promise.all(images.map((file) => toBase64(file)));
                payload.images = base64Images;
            }
            if (colorSampleImageFile) {
                payload.colorSampleImage = await toBase64(colorSampleImageFile);
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