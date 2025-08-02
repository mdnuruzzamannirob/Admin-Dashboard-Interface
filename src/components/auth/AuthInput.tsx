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
          <FormLabel className={labelClassName}>{label}</FormLabel>
          <div className="flex w-full flex-col gap-1">
            <FormControl>
              <input
                placeholder={placeholder}
                className={cn(
                  "bg-surface ring-primary h-9 rounded-sm border px-3 focus:border-transparent focus:ring-2",
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
