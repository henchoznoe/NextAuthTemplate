"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginFormSchema } from "@/schemas/auth";
import { z } from "zod";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { revalidatePath } from "next/cache";

const LoginForm = () => {

  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof userLoginFormSchema>>({
    resolver: zodResolver(userLoginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleLogin = async (data: z.infer<typeof userLoginFormSchema>) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });
    if ( result?.error ) {
      toast.error(`Error: ${result.error}`);
    } else {
      router.push('/dashboard')
      router.refresh();
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4 text-sm">
        If you don&apos;t have an account, please&nbsp;
        <Link className="text-indigo-600 hover:underline" href="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );

}

export default LoginForm;