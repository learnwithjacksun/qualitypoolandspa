
import api from "../config/api";
import { useQuery } from "@tanstack/react-query";


export default function useProduct() {





    const getProducts = async () => {
        const response = await api.get("/products")
        return response.data.products

    }

    const { data: products, isLoading: isLoadingProducts } = useQuery<IProduct[]>({
        queryKey: ["products"],
        queryFn: getProducts,
    })

    return {
        products,
        isLoadingProducts,
    }
}