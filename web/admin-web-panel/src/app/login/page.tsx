"use client";

import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { Loader2 } from "lucide-react";
import { loginSchema, LoginSchema } from "@/schemas/login-shema";
import { toast } from "sonner";
import Scene from "@/components/creeper-scene";

export default function Login() {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    disabled: loading,
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    try {
      await signIn("credentials", {
        username: values.username,
        password: values.password,
        callbackUrl: `/`,
      });
    } catch (error) {
      // Handle the error here
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (session) {
    router.push("/");
  }

  useEffect(() => {
    const err = searchParams.get("error");

    if (err) {
      const errorMessage =
        err === "CredentialsSignin" ? "Неправильний пароль" : "Unknown error";

      new Promise(() =>
        setTimeout(() => {
          toast.error(errorMessage);
        }, 10)
      );
    }
  }, [searchParams]);

  return (
    <div className="flex h-dvh flex-col items-center gap-15 align-middle">
      <div className="mt-10">
        <Scene/>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Юзернейм</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Твій юзернейм"
                    autoComplete="username"
                    className="rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Твій пароль"
                    type="password"
                    autoComplete="password"
                    className="rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-60 rounded-xl" type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <>Увійти</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
