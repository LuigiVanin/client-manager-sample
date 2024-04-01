import { CustomerTable } from "@/components/customer/customer-table";
import { Button } from "@/components/ui/button";
import { GrAdd as AddIcon } from "react-icons/gr";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="max-w-content flex min-h-full w-full flex-1 flex-col items-center justify-start gap-6 bg-background px-8 py-4">
      <div className="flex w-full items-center justify-between border-b-2 border-solid border-muted pb-3">
        <h1 className="text-lg font-semibold">Customers</h1>
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

      <CustomerTable />
    </div>
  );
}

export default Home;
