import React, { useState } from "react";
import api from "../../../services/api";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Swal from "sweetalert2";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  height: string;
  weight: string;
}

const SignIn: React.FC = () => {
  const [showPassword] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post("/api/v1/auth/signupNutri", data);
      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Your account has been created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/signIn");
          }
        });
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while creating your account.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col max-w-[120vh] max-h-[120vh]">
        <div className="flex items-center mb-10">
          <img src="" alt="company-logo" className="w-32"/>
          <h1 className="font-main font-extrabold text-4xl ml-4">
            Registre-se agora
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("fullName")}
            placeholder="Nome completo"
            backgroundColor="bg-dark-white"
            icon={
              <button onClick={() => reset({ fullName: "" })}>
              </button>
            }
            label="Nome completo"

          />
          <Input
            {...register("email")}
            backgroundColor="bg-dark-white"
            icon={
              <button onClick={() => reset({ email: "" })}>
              </button>
            }
            placeholder="Email"
            label="Email"

          />
          <Input
            {...register("password")}
            backgroundColor="bg-dark-white"
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            label="Senha"
          />
          <div className="flex justify-between">
            <div className="w-[47%]">
              <Input
                {...register("height")}
                backgroundColor="bg-dark-white"
                icon={
                  <button onClick={() => reset({ height: "" })}>
                  </button>
                }
                placeholder="Altura (cm)"
                label="Altura"
              />
            </div>
            <div className="w-[47%]">
              <Input
                {...register("weight")}
                backgroundColor="bg-dark-white"
                icon={
                  <button onClick={() => reset({ weight: "" })}>
                  </button>
                }
                placeholder="Peso (kg)"
                label="Peso"

              />
              <p className="text-xs text-subtitle">
                Você poderá trocar o peso depois
              </p>
            </div>
          </div>

          <div className="flex my-5">
            <input type="checkbox" className="mr-2" />
            <p className="text-sm">
              Ao criar a conta, você aceita nossos Termos de Uso e Políticas de
              Privacidade.
            </p>
          </div>
          <div className="flex mb-10">
            <input type="checkbox" className="mr-2 self-start" />
            <p className="text-sm self-start">
              Ao criar a conta, você aceita receber mensagens SMS e emails,
              incluindo atualizações do site, eventos, e promoções.
            </p>
          </div>

          <Button title="Criar conta" marginBottom="mb-[5px]" />
        </form>
        <div className="flex justify-center">
          <p className="text-sm text-title mr-2">Já possui uma conta?</p>
          <Link to={"/signIn"}>
            <p className="text-primary text-sm">Entrar</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
