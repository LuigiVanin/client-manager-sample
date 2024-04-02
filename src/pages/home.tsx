import { useMemo, useState } from "react";
import { GrAdd as AddIcon } from "react-icons/gr";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CustomerTable } from "@/components/customer/customer-table";
import { Modal, ModalDescription, ModalTitle } from "@/components/global/modal";
import {
  useFetchCustomers,
  useDeleteCustomer,
} from "@/hooks/api/use-customers";

function Home() {
  const [customerDeleteId, setCustomerDeleteId] = useState<string | null>(null);
  const openDeleteCustomerModal = useMemo(
    () => customerDeleteId !== null,
    [customerDeleteId],
  );

  const { data, isLoading } = useFetchCustomers();
  const { mutate: deleteCustomer } = useDeleteCustomer();

  const clearCustomerDeleteId = () => setCustomerDeleteId(null);

  const handleDeleteCustomer = () => {
    if (customerDeleteId) {
      deleteCustomer(customerDeleteId);
      clearCustomerDeleteId();
    }
  };

  return (
    <div className="flex min-h-full w-full max-w-content flex-1 flex-col items-center justify-start gap-6 bg-background px-8 py-4">
      <div className="flex w-full items-center justify-between border-b-2 border-solid border-muted pb-3">
        <h1 className="text-lg font-semibold">Home</h1>
        <Link to="/customer/register">
          <Button
            className="gap-2"
            size="sm"
          >
            <AddIcon size="1rem" />
            Create Customer
          </Button>
        </Link>
      </div>

      <CustomerTable
        loading={isLoading}
        customers={data || []}
        onCustomerDelete={(id) => setCustomerDeleteId(id)}
      />
      <Modal
        open={openDeleteCustomerModal}
        onOverlayClick={clearCustomerDeleteId}
      >
        <header className="flex flex-col space-y-2 text-center sm:text-left">
          <ModalTitle className="text-lg font-semibold">
            Delete Customer
          </ModalTitle>
          <ModalDescription className="text-sm text-muted-foreground">
            Are you sure you want to delete this customer?
          </ModalDescription>
        </header>
        <footer className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button
            variant="ghost"
            onClick={clearCustomerDeleteId}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteCustomer}
          >
            Deletar
          </Button>
        </footer>
      </Modal>
    </div>
  );
}

export default Home;
