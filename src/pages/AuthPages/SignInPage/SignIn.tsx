import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import api from "../../../services/api";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import { useAuth } from "../../../context/authContext";
import Swal from "sweetalert2";

const SignIn: React.FC = () => {
  const [showPassword] = useState(false);
  const { handleSetToken } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  interface SignInRequest {
    email: string;
    password: string;
  }

  const handleSignIn = async (data: SignInRequest) => {
    const { email, password } = data;
    try {
      const response = await api.post("/api/v1/nutri/auth/login", {
        login: email,
        password: password,
      });

      console.log(response);
      const responseData = response.data;
      const { accessToken, refreshToken } = responseData.data;

      if (accessToken && refreshToken) {
        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);
        handleSetToken(accessToken, refreshToken);
        navigate("/dashboard");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Invalid credentials. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.log("Error during login request:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while attempting to login.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col max-w-[120vh] max-h-[120vh]">
        <div className="flex items-center mb-10">
          <img src='' alt="company-logo" className="w-32" />
          <div className="ml-4">
            <h1 className="font-main font-extrabold text-4xl">Food For You</h1>
            <p className="text-title">Por favor preencha com suas credenciais para fazer o login</p>
          </div>
        </div>
        <form onSubmit={handleSubmit((data) => handleSignIn(data as SignInRequest))}>
          <Input
            {...register("email")}
            label="Email"
            placeholder="Email"
            backgroundColor="bg-dark-white"
            icon={
              <button onClick={() => reset({ email: "" })}>
              </button>
            }
          />
          <Input
            {...register("password")}
            label="Senha"
            placeholder="Senha"
            backgroundColor="bg-dark-white"
            type={showPassword ? "text" : "password"}
          />

          <div className="flex items-center justify-between mb-7">
            <div className="flex">
              <input type="checkbox" />
              <label className="ml-2">Lembrar de mim</label>
            </div>
            <Link to={""}>
              <p className="text-primary">Esqueceu sua senha?</p>
            </Link>
          </div>

          <div>
            <Button type="submit" title="Entrar" marginBottom="mb-[5px]" />
            <Button
              outline
              type="submit"
              title="Entrar com o Google"
              icon={<img src="src/assets/Google.png" alt="" />}
            />
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <p className="text-sm title mr-2">Não tem uma conta?</p>
          <Link to={"/signUp"}>
            <p className="text-primary text-sm">Crie uma conta</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;