"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CreeperScene, ExplosionGif } from "@/components/custom";
import { LoginSchema, loginSchema } from "@/components/schemas/login-shema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Login() {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);
  const [explosionAnimate, setExplosionAnimate] = useState(false);

  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    disabled: loading,
  });

  async function onSubmit(values: LoginSchema) {
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
    });

    if (result?.ok) {
      setExplosionAnimate(true);

      setTimeout(() => {
        router.push("/");
      }, 2500);

      setLoading(false);
    } else {
      const errorMessage =
        result?.error === "CredentialsSignin"
          ? "Неправильний пароль"
          : "Unknown error";
      toast.error(errorMessage);
      setLoading(false);
    }
  }

  if (session && !explosionAnimate) {
    router.push("/");
  }

  return (
    <div className="flex h-dvh flex-col items-center gap-14 align-middle">
      {explosionAnimate && (
        <ExplosionGif className="absolute aspect-auto h-dvh w-dvw" />
      )}
      <div className="mt-10">
        <CreeperScene />
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
              <Loader2 className="ml-2 size-4 animate-spin" />
            ) : (
              <>Увійти</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
