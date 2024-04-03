export type FullAdress = {
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type Customer = {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  createdAt: Date;

  fullAddress?: FullAdress;
};

export type CreateCustomer = Omit<Customer, "id" | "createdAt">;

export type UpdateCustomer = CreateCustomer;
