"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  ig: z.string().min(2, {
    message: "Instagram não pode estar vazio.",
  }),
  password: z.string().min(2, {
    message: "Senha não pode estar vazia.",
  }),
});
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ig: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.message) {
        form.setError("password", {
          type: "validate",
          message: result.message,
        });
      }

      if (result.token) {
        Cookies.set("token", result.token);
        router.push("/");
      }
    } catch (error: any) {
      form.setError("password", {
        type: "manual",
        message:
          "Erro ao tentar fazer login, tente novamente mais tarde (ou fale com a Yasmin).",
      });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-1/3 border mx-auto backdrop-blur-xl bg-white/30 p-8 rounded-lg">
        <Image
          src="/logo.png"
          alt="Logo"
          width={80}
          height={80}
          className="mb-4"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 mb-3"
          >
            <FormField
              control={form.control}
              name="ig"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu @ do instagram" {...field} />
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
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite sua senha"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
          <Link href="/signup">Clique aqui para fazer o seu cadastro!</Link>
        </Form>
      </div>
    </div>
  );
}
