import { CreateCustomer, Customer, UpdateCustomer } from "@/types/customers";
import { api } from "./api";

async function fetchAllCustomers(): Promise<Customer[] | null> {
  try {
    const response = await api.get<Customer[]>("api/Customer");
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function fetchCustomerById(id: string): Promise<Customer | null> {
  try {
    const response = await api.get<Customer>(`api/Customer/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function createCustomer(
  customer: CreateCustomer,
): Promise<Customer | null> {
  try {
    const response = await api.post<Customer>("api/Customer", customer);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updateCustomer(
  id: string,
  customer: UpdateCustomer,
): Promise<Customer | null> {
  try {
    const response = await api.put<Customer>(`api/Customer/${id}`, customer);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function deleteCustomer(id: string): Promise<boolean> {
  try {
    await api.delete(`api/Customer/${id}`);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export const customerService = {
  fetchAll: fetchAllCustomers,
  fetchById: fetchCustomerById,
  create: createCustomer,
  delete: deleteCustomer,
  update: updateCustomer,
};
