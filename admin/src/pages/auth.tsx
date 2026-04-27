import { LockIcon, Mail } from "lucide-react";
import { InputWithIcon, ButtonWithLoader } from "../components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../schemas/auth";

export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  return (
    <div className="bg-primary min-h-[100dvh]">
      <div className="max-w-lg mx-auto w-[90%] space-y-8 pt-20">
        <div className="center">
          <img src="logo.png" alt="" className="h-7 md:h-10 w-auto object-contain" />
        </div>
        <div className="bg-white p-6 md:p-8 rounded-xl space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary font-space">
              Admin Panel
            </h3>
            <p className="text-main">
              Please enter your credentials to access.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputWithIcon
              icon={<Mail className="w-4 h-4 text-muted" />}
              label="Email"
              type="email"
              placeholder="Enter your email"
              className="bg-secondary"
              {...register("email")}
              error={errors.email?.message}
            />
            <InputWithIcon
              icon={<LockIcon className="w-4 h-4 text-muted" />}
              label="Password"
              type="password"
              placeholder="Enter your password"
              className="bg-secondary"
              {...register("password")}
              error={errors.password?.message}
            />
            <ButtonWithLoader
              initialText="Login"
              loadingText="Logging in..."
              loading={false}
              type="submit"
              className="w-full btn-primary h-11 rounded-md"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
