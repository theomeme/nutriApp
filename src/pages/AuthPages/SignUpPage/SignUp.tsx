import React, {useState} from "react";
import api from "../../../services/api";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Swal from "sweetalert2";
import logo from "../../../Assets/Logo.png";

import "./SignUp.css";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  height: string;
  weight: string;
}

const SignUp: React.FC = () => {
  const [showPassword] = useState(false);
  const {register, handleSubmit, reset} = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post("/api/v1/nutri/auth/signup", data);
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
    <div className="signup-container">
      <div className="signup-form">
        <div className="signup-title">
          {/*<img src={logo} alt="company-logo" className="signup-logo" />'*/}
          <h1>Registre-se agora</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="signin-input">
            <Input
              {...register("fullName")}
              placeholder="Nome completo"
              backgroundColor="bg-dark-white"
              icon={<button onClick={() => reset({fullName: ""})}></button>}
              label="Nome completo"
            />
            <Input
              {...register("email")}
              backgroundColor="bg-dark-white"
              icon={<button onClick={() => reset({email: ""})}></button>}
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
          </div>

          <div className="signup-button-container">
            <Button type="submit" title="Criar conta" />
          </div>
        </form>
        <div className="signup-">
          <p className="signup-">Já possui uma conta?</p>
          <Link to={"/signIn"} className="signup-footer-link">
            <p className="signup-">Entrar</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
