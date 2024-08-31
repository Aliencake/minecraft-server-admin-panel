"use client";

import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { loginSchema, LoginSchema } from "@/schemas/login-shema";
import { toast } from "sonner";
import CreeperScene from "@/components/creeper-scene";
import ExplosionGif from "@/components/creeper-explosion";

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

      const result =   await signIn("credentials", {
         redirect: false,
         username: values.username,
         password: values.password,
       });

      if (result?.ok) {
          setExplosionAnimate(true)

          setTimeout(() => {
              router.push("/");
          }, 2500);

          setLoading(false);
      } else {
          const errorMessage = result?.error === "CredentialsSignin" ? "Неправильний пароль" : "Unknown error";
          toast.error(errorMessage);
          setLoading(false);
      }
      }


  if (session && !explosionAnimate) {
    router.push("/");
  }

  return (
    <div className="flex h-dvh flex-col items-center gap-15 align-middle">
        {explosionAnimate && <ExplosionGif className="absolute h-dvh w-dvw aspect-auto"/>}
      <div className="mt-10">
        <CreeperScene/>
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
