import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GrFormEdit } from "react-icons/gr";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useMaskito } from "@maskito/react";
import type { MaskitoOptions } from "@maskito/core";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchCustomerById,
  useUpdateCustomer,
} from "@/hooks/api/use-customers";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, formatPhoneNumber } from "@/lib/utils";
import { SingleAccoridion } from "@/components/global/single-accordion";
import { PiSpinnerBold } from "react-icons/pi";

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

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid e-mail.",
  }),
  phone: z.string().min(10, {
    message: "Invalid phone number.",
  }),
  city: z.string().min(2, { message: "Invalid city" }),
  address: z.string().min(2, { message: "Invalid adress" }),
  state: z.string().min(2, { message: "Invalid state" }),
  zip: z.string().min(2, { message: "Invalid zip code" }),
  country: z.string().min(2, { message: "Invalid country" }),
});

function EditCustomer() {
  const inputRef = useMaskito({ options: phoneNumberMask });
  const navigate = useNavigate();
  const params = useParams();
  const [phoneMirror, setPhoneMirror] = useState("");

  const { data } = useFetchCustomerById(params.id);
  const { mutate: updateCustomer, isPending } = useUpdateCustomer(params.id);

  const {
    setValue,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (!params.id) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (data) {
      setValue("phone", data.phone);
      setPhoneMirror(formatPhoneNumber(data.phone) || data.phone);
      setValue("fullName", data.fullName);
      setValue("email", data.email);
      setValue("city", data.fullAddress?.city || "");
      setValue("address", data.fullAddress?.address || "");
      setValue("state", data.fullAddress?.state || "");
      setValue("zip", data.fullAddress?.zip || "");
      setValue("country", data.fullAddress?.country || "");
    }
  }, [data]);

  const customerSubmit = () => {
    updateCustomer(
      {
        fullName: getValues("fullName"),
        email: getValues("email"),
        phone: getValues("phone").replace(/[()\s-]/g, ""),
        fullAddress: {
          city: getValues("city"),
          address: getValues("address"),
          state: getValues("state"),
          zip: getValues("zip"),
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
                placeholder="(89) 99999-9999"
                type="text"
                aria-invalid={!!errors.email}
                onInput={(e) => {
                  setValue("phone", e.currentTarget.value);
                  setPhoneMirror(e.currentTarget.value);
                }}
                value={phoneMirror}
                className={cn({ "border-red-400": !!errors.phone })}
              />
              {errors.phone && (
                <span className="!mt-0 text-sm text-destructive">
                  {errors.phone?.message}
                </span>
              )}

              <SingleAccoridion
                title="Customer Address"
                disabled={false}
                defaultOpen
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
                  <Label htmlFor="adress">Full Address</Label>
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
            </div>
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
                    <GrFormEdit size="1.5rem" />
                    Edit
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

export default EditCustomer;
