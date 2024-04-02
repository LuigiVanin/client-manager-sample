import { customerService } from "@/services/customer-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchCustomers = () => {
  const query = useQuery({
    queryKey: ["customers-list"],
    queryFn: customerService.fetchAll,
  });

  return query;
};

export const useFetchCustomerById = (id?: string) => {
  if (!id) throw new Error("id is required");
  // const client = useQueryClient();

  const query = useQuery({
    queryKey: ["customer", id],
    queryFn: () => {
      return customerService.fetchById(id);
    },
  });

  return query;
};

export const useCreateCustomer = () => {
  const client = useQueryClient();
  const mutate = useMutation({
    mutationFn: customerService.create,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["customers-list"] });
    },
  });

  return mutate;
};

export const useDeleteCustomer = () => {
  const client = useQueryClient();
  const mutate = useMutation({
    mutationFn: customerService.delete,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["customers-list"] });
    },
  });

  return mutate;
};
