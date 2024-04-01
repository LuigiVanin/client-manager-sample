import { Button } from "@/components/ui/button";
import { GrAdd as AddIcon } from "react-icons/gr";

function RegisterCostumer() {
  return (
    <div className="max-w-content flex min-h-full w-full flex-1 flex-col items-center justify-start gap-6 bg-background px-8 py-4">
      <div className="flex w-full items-center justify-between border-b-2 border-solid border-muted pb-3">
        <h1 className="text-lg font-semibold">Customers</h1>
        <Button
          className="gap-2"
          size="sm"
        >
          <AddIcon size="1rem" />
          Create
        </Button>
      </div>
    </div>
  );
}

export default RegisterCostumer;
