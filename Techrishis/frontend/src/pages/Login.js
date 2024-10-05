import { useState, useRef } from "react";
import { useLogin } from "../hooks/useLogin";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import "./login.css";

const TARGET_TEXT = "Log In"; 
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const intervalRef = useRef(null);
  const [text, setText] = useState(TARGET_TEXT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const scramble = () => {
    let pos = 0;
    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }
          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          return CHARS[randomCharIndex];
        })
        .join("");
      setText(scrambled);
      pos++;
      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setText(TARGET_TEXT);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <motion.button
        type="submit"
        onMouseEnter={scramble}
        onMouseLeave={stopScramble}
        className="login-button"
        disabled={isLoading}
      >
        <div className="flex items-center gap-2">
          <FiLock />
          <span>{text}</span>
        </div>
      </motion.button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
