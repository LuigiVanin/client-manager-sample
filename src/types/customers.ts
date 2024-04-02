export type Customer = {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  createdAt: Date;
};

export type CreateCustomer = Omit<Customer, "id" | "createdAt">;
