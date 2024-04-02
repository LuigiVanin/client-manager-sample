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
import { useNavigate } from "react-router-dom";
import { useCreateCustomer } from "@/hooks/api/use-customers";
import { PiSpinnerBold } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

function RegisterCostumer() {
  const [value, setValue] = useState("");
  const inputRef = useMaskito({ options: phoneNumberMask });
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateCustomer();

  const formSchema = z.object({
    fullName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Invalid e-mail.",
    }),
    phone: z.string().min(14, {
      message: "Invalid phone number.",
    }),
  });

  const test = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    console.log(test);
  }, []);

  const customerSubmit = () => {
    console.log("Customer submitted");
    mutate({
      fullName: "Test",
      email: "asdadsd@gmail.com",
      phone: "12312312312",
    });
  };

  return (
    <div className="flex min-h-full w-full max-w-content flex-1 flex-col items-center justify-start gap-6 bg-background px-8 py-4">
      <div className="flex w-full items-center justify-between border-b-2 border-solid border-muted pb-3">
        <h1 className="text-lg font-semibold">Home / Register Customer</h1>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Register Customer</CardTitle>
          <CardDescription>
            Fill the form with all the proper data to register a new customer.
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
                {...test.register("fullName")}
              />
              {test.getValues("fullName")}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                placeholder="Customer e-mail..."
                type="email"
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

        <CardFooter className="flex gap-2">
          <Button
            variant="secondary"
            className="gap-2"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            className="min-w-28 gap-2"
            onClick={customerSubmit}
          >
            {!isPending ? (
              <>
                <AddIcon size="1rem" />
                Create
              </>
            ) : (
              <PiSpinnerBold
                size="1.5rem"
                className="animate-slow-spin"
              />
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterCostumer;
