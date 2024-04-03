import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GrAdd as AddIcon } from "react-icons/gr";
import { useMaskito } from "@maskito/react";
import type { MaskitoOptions } from "@maskito/core";
import { useNavigate } from "react-router-dom";
import { useCreateCustomer } from "@/hooks/api/use-customers";
import { PiSpinnerBold } from "react-icons/pi";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { SingleAccoridion } from "@/components/global/single-accordion";

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
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
};

function RegisterCostumer() {
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
    city: z.string().min(2, { message: "Invalid city" }),
    address: z.string().min(2, { message: "Invalid adress" }),
    state: z.string().min(2, { message: "Invalid state" }),
    zip: z.string().min(2, { message: "Invalid zip code" }),
    country: z.string().min(2, { message: "Invalid country" }),
  });

  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const customerSubmit: SubmitHandler<z.infer<typeof formSchema>> = () => {
    mutate(
      {
        fullName: getValues("fullName"),
        email: getValues("email"),
        phone: getValues("phone").replace(/[()\s-]/g, ""),
        fullAddress: {
          address: getValues("address"),
          city: getValues("city"),
          zip: getValues("zip"),
          state: getValues("state"),
          country: getValues("country"),
        },
      },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
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
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(customerSubmit)}
          >
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Customer name..."
                maxLength={100}
                className={cn({ "border-red-400": !!errors.fullName })}
                {...register("fullName")}
              />
              {errors.fullName && (
                <span className="!mt-0 text-sm text-destructive">
                  {errors.fullName?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                placeholder="Customer e-mail..."
                type="email"
                maxLength={100}
                {...register("email")}
                className={cn({ "border-red-400": !!errors.email })}
              />
              {errors.email && (
                <span className="!mt-0 text-sm text-destructive">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                ref={inputRef}
                id="phone"
                placeholder="(84) 99117-5905"
                type="text"
                aria-invalid={!!errors.email}
                onInput={(e) => setValue("phone", e.currentTarget.value)}
                className={cn({ "border-red-400": !!errors.phone })}
              />
              {errors.phone && (
                <span className="!mt-0 text-sm text-destructive">
                  {errors.phone?.message}
                </span>
              )}
            </div>

            <SingleAccoridion
              title="Customer Address"
              defaultOpen
              disabled
            >
              <div className="flex w-full gap-4 px-1 pt-2">
                <div className="flex flex-1 flex-col space-y-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="Customer country..."
                    maxLength={100}
                    {...register("country")}
                    className={cn({ "border-red-400": !!errors.country })}
                  />
                  {errors.country && (
                    <span className="!mt-0 text-sm text-destructive">
                      {errors.country?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col space-y-1.5">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="Customer state..."
                    maxLength={100}
                    {...register("state")}
                    className={cn({ "border-red-400": !!errors.state })}
                  />
                  {errors.state && (
                    <span className="!mt-0 text-sm text-destructive">
                      {errors.state?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex w-full gap-4 px-1 pt-2">
                <div className="flex flex-1 flex-col space-y-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Customer country..."
                    maxLength={100}
                    {...register("city")}
                    className={cn({ "border-red-400": !!errors.city })}
                  />
                  {errors.city && (
                    <span className="!mt-0 text-sm text-destructive">
                      {errors.city?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col space-y-1.5">
                  <Label htmlFor="zip">Zip code</Label>
                  <Input
                    id="zip"
                    placeholder="Customer zip code..."
                    maxLength={100}
                    {...register("zip")}
                    className={cn({ "border-red-400": !!errors.zip })}
                  />
                  {errors.zip && (
                    <span className="!mt-0 text-sm text-destructive">
                      {errors.zip?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-1 flex-col space-y-1.5 px-1">
                <Label htmlFor="phone">Full Address</Label>
                <Input
                  id="address"
                  placeholder="Customer Full Address..."
                  maxLength={100}
                  {...register("address")}
                  className={cn({ "border-red-400": !!errors.state })}
                />
                {errors.address && (
                  <span className="!mt-0 text-sm text-destructive">
                    {errors.address?.message}
                  </span>
                )}
              </div>
            </SingleAccoridion>
            <footer className="flex justify-end gap-2 pb-3 pt-6">
              <Button
                variant="secondary"
                className="gap-2"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="min-w-28 gap-2"
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
            </footer>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterCostumer;
