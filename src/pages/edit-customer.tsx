import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GrAdd as AddIcon } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useMaskito } from "@maskito/react";
import type { MaskitoOptions } from "@maskito/core";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchCustomerById } from "@/hooks/api/use-customers";

const phoneNumberMask: MaskitoOptions = {
  mask: [
    "(",
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
};

function EditCustomer() {
  const inputRef = useMaskito({ options: phoneNumberMask });
  const [value, setValue] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const { data } = useFetchCustomerById(params.id);

  useEffect(() => {
    if (!params.id) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (data) {
      setValue(data.phone);
      setFullName(data.fullName);
      setEmail(data.email);
    }
  }, [data]);

  return (
    <div className="flex min-h-full w-full max-w-content flex-1 flex-col items-center justify-start gap-6 bg-background px-8 py-4">
      <div className="flex w-full items-center justify-between border-b-2 border-solid border-muted pb-3">
        <h1 className="text-lg font-semibold">Home / Customer Update</h1>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Edit Customer</CardTitle>
          <CardDescription>
            Fill the form with all the proper data to edit a customer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action=""
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Customer name..."
                maxLength={100}
                onInput={(e) => setFullName(e.currentTarget.value)}
                value={fullName}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                placeholder="Customer e-mail..."
                type="email"
                onInput={(e) => setValue(e.currentTarget.value)}
                value={email}
                maxLength={100}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                value={value}
                ref={inputRef}
                id="phone"
                placeholder="(84) 99117-5905"
                type="text"
                onInput={(e) => setValue(e.currentTarget.value)}
              />
            </div>
          </form>
        </CardContent>

        <CardFooter className="mt-6 flex justify-end gap-2">
          <Button
            variant="secondary"
            className="gap-2"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button className="gap-2">
            <AddIcon size="1rem" />
            Create
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default EditCustomer;
