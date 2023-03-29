import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import Info from "./Info";
import TextInput from "./TextInput";
export default function SignupForm() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPAssword] = useState();
  const [agree, setAgree] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const { signup } = useAuth();
  const navigation = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    //default validation
    if (!username || !email || !password || !confirmPassword || !agree) {
      return setError("Please fill in all the fields");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      navigation.push("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Fail to signup");
    }
  }
  return (
    <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Enter name"
        icon="person"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextInput
        type="text"
        required
        placeholder="Enter email"
        icon="alternate_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        type="password"
        required
        placeholder="Enter password"
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextInput
        type="password"
        required
        placeholder="Confirm password"
        icon="lock_clock"
        value={confirmPassword}
        onChange={(e) => setConfirmPAssword(e.target.value)}
      />
      <Checkbox
        type="checkbox"
        text=" I agree to the Terms &amp; Conditions"
        required
        value={agree}
        onChange={(e) => setAgree(e.target.value)}
      />
      disable
      <Button type="submit" disable={loading}>
        Submit now
      </Button>
      {error && <p className="error">{error}</p>}
      <Info>
        Already have an account? <Link to="/login">Login</Link> instead.
      </Info>
    </Form>
  );
}
