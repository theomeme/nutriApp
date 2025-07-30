import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import api from "../../../services/api";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import { useAuth } from "../../../context/authContext";
import Swal from "sweetalert2";
import "./SignIn.css";

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

      const responseData = response.data;
      const { accessToken, refreshToken } = responseData.data;

      if (accessToken && refreshToken) {
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
      Swal.fire({
        title: "Error!",
        text: "An error occurred while attempting to login.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <div className="signin-title">
          <h1>Food For You</h1>
          <p>Por favor preencha com suas credenciais para fazer o login</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => handleSignIn(data as SignInRequest))}
        >
          <div className="signin-input">
            <Input {...register("email")} label="Email" placeholder="Email" />
          </div>
          <div className="signin-input">
            <Input
              {...register("password")}
              label="Senha"
              placeholder="Senha"
              type={showPassword ? "text" : "password"}
            />
          </div>

          <div className="signin-checkbox-container">
            <div>
              <input type="checkbox" />
              <label>Lembrar de mim</label>
            </div>
            <Link to={""} className="signin-link">
              Esqueceu sua senha?
            </Link>
          </div>

          <div className="signin-button-container">
            <Button type="submit" title="Entrar" />
            <Button
              outline
              type="button"
              title="Entrar com o Google"
            />
          </div>
        </form>
        <div className="signin-footer">
          <p className="signin-footer-text">Não tem uma conta?</p>
          <Link to={"/signUp"} className="signin-footer-link">
            Crie uma conta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
