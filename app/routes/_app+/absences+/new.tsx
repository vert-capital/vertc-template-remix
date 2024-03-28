import { zodResolver } from "@hookform/resolvers/zod";
import { useFetcher, useNavigate } from "@remix-run/react";
import {
  Button,
  Card,
  CardContent,
  DateRangePicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
  Input,
  SelectBasic,
  Separator,
  sonner,
} from "@vert-capital/design-system-ui";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { AbsenceSchema, TAbsenceFilter } from "~/models/absence.model";

export default function AbsenceNew() {
  const fetcher = useFetcher();
  const requestOptions = [{ value: "5", label: "Day-off (Aniversário)" }];
  const managerOptions = [{ value: "127", label: "Thiago Freitas" }];
  const teamOptions = [
    { value: "11", label: "Tecnologia / Digital / Projetos" },
  ];

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const form = useForm<TAbsenceFilter>({
    resolver: zodResolver(AbsenceSchema),
    defaultValues: {
      nome: "",
      email: "",
      tipo: "",
      time: "",
      gestor: "",
      data: { from: undefined, to: undefined },
    },
  });

  const onSubmit = async (values: z.infer<typeof AbsenceSchema>) => {
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]: any) => {
        if (key === "data") {
          formData.append("dataInicio", value.from);
          formData.append("dataFim", value.to);
        }
        formData.append(key, value);
      });
      fetcher.submit(formData, {
        action: "/api/absences/new",
        method: "post",
      });
      sonner.toast("Solicitação cadastrada com sucesso!");
    } catch (error: any) {
      sonner.toast("Erro na solicitação.");
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center pt-3 pb-5 space-y-2">
        <div className="w-full flex justify-start items-center space-x-2 min-h-10">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={goBack}
            className="h-8 w-8"
          >
            <Icons.ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="w-full flex justify-start items-center ml-20">
            <h1 className="text-3xl font-bold">Nova Solicitação de Ausência</h1>
          </div>
        </div>
      </div>
      <Separator className="mb-4" />
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full h-auto bg-transparent flex flex-col justify-start items-start">
            <Card className="w-full">
              <CardContent className="space-y-4 flex flex-col justify-start items-start">
                <div className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4">
                    <FormField
                      control={form.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Seu Nome"
                              type="name"
                              autoComplete="off"
                              autoCorrect="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Seu e-mail"
                              type="email"
                              autoComplete="email"
                              autoCorrect="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tipo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Solicitação</FormLabel>
                          <FormControl>
                            <SelectBasic
                              field={field}
                              placeholder={"Selecionar solicitação"}
                              options={requestOptions} // option default
                              disabledClear
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gestor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gestor</FormLabel>
                          <FormControl>
                            <SelectBasic
                              field={field}
                              placeholder={"Selecionar gestor"}
                              options={managerOptions} // option default
                              disabledClear
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <SelectBasic
                              field={field}
                              placeholder={"Selecionar time"}
                              options={teamOptions} // option default
                              disabledClear
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="data"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data</FormLabel>
                          <FormControl>
                            <DateRangePicker field={field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex w-full justify-end mt-4">
              <Button type="submit">Cadastrar</Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
