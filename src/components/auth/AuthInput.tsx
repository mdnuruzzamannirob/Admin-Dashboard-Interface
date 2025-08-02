import { cn } from "../../lib/utils";
import { FormControl, FormField, FormLabel, FormMessage } from "../ui/form";

interface CustomInput {
  control: any;
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

const AuthInput = ({
  control,
  name,
  label,
  type = "text",
  placeholder,
  className,
  inputClassName,
  labelClassName,
}: CustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className={cn("w-full space-y-2", className)}>
          <FormLabel className={cn("text-muted-foreground", labelClassName)}>
            {label}
          </FormLabel>
          <div className="flex w-full flex-col gap-1">
            <FormControl>
              <input
                placeholder={placeholder}
                className={cn(
                  "bg-gray-100 py-[6px] px-3 rounded-sm border outline-none focus:ring-2 focus:ring-primary",
                  inputClassName
                )}
                type={type}
                {...field}
                value={field.value ?? ""} // Ensure value is not null
              />
            </FormControl>
            <FormMessage className="text-xs capitalize" />
          </div>
        </div>
      )}
    />
  );
};

export default AuthInput;
