import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import "../Styles/Cadastro.css";
import logo from "../img/logo.png";
import { autenticar, criarNovoUsuario } from "../services/api/usuario";

const validatePassword = (password) => {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*]/.test(password),
  };

  const isValid = Object.values(requirements).every(Boolean);
  return { requirements, isValid };
};

const SignupForm = () => {
  const usuarioInputRef = useRef(null);
  const dataNascimentoInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const senhaInputRef = useRef(null);
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const { requirements, isValid } = validatePassword(newPassword);
    setValidation(requirements);
    setIsPasswordValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const nome = usuarioInputRef.current.value;
      const datanascimento = dataNascimentoInputRef.current.value;
      const email = emailInputRef.current.value;
      const senha = senhaInputRef.current.value;

      await criarNovoUsuario({ nome, datanascimento, email, senha });
      await autenticar({ email, senha });

      navigate('/entrar');
    } catch (error) {
      if (error.response && error.response.data) {
        if ('error' in error.response.data) {
          alert(error.response.data.error);
        } else {
          alert(error.response.data.errors[0].msg);
        }
      } else {
        alert("Ocorreu um erro. Por favor, tente novamente.");
      }
    }
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-form">
        <div className="logo-container">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "208px", height: "208px" }}
            />
          </Link>
          <h2>Cadastro</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="usuario"
              placeholder="Usuário"
              ref={usuarioInputRef}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="date"
              name="dataNascimento"
              ref={dataNascimentoInputRef}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              ref={emailInputRef}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              ref={senhaInputRef}
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <ul className="password-requirements">
              <li>
                {validation.length ? <FaCheckCircle className="valid" /> : <FaTimesCircle className="invalid" />} Pelo menos 8 caracteres
              </li>
              <li>
                {validation.uppercase ? <FaCheckCircle className="valid" /> : <FaTimesCircle className="invalid" />} Pelo menos uma letra maiúscula
              </li>
              <li>
                {validation.lowercase ? <FaCheckCircle className="valid" /> : <FaTimesCircle className="invalid" />} Pelo menos uma letra minúscula
              </li>
              <li>
                {validation.number ? <FaCheckCircle className="valid" /> : <FaTimesCircle className="invalid" />} Pelo menos um número
              </li>
              <li>
                {validation.specialChar ? <FaCheckCircle className="valid" /> : <FaTimesCircle className="invalid" />} Pelo menos um caractere especial (!@#$%^&*)
              </li>
            </ul>
          </div>

          <button type="submit" className="submit-button" disabled={!isPasswordValid}>
            Inscreva-se
          </button>
        </form>

        <div className="signup-link">
          Já possui uma conta? <Link to="/entrar">Entre aqui</Link>!
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
