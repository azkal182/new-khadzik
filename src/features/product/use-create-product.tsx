import { createProduct } from "@/actions/product-action";
import { useMutation } from "@tanstack/react-query";

const useCreateProduct = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: async (body) => {
      const productResponse = await createProduct(body as any);
      productResponse;
    },
    onSuccess,
  });
};

export default useCreateProduct;
