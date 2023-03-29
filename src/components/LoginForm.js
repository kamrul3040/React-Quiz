import { Link } from "react-router-dom";
import Button from "./Button";
import Form from "./Form";
import Info from "./Info";
import TextInput from "./TextInput";

export default function LoginForm() {
  return (
    <Form style={{ height: "330px" }}>
      <TextInput type="text" placeholder="Email" icon="alternate_email" />
      <TextInput type="password" placeholder="Enter password" icon="lock" />
      <Button type="submit">
        <span>Submit Now</span>
      </Button>
      <Info>
        Already have an account? <Link to="/signup">Signup</Link> instead.
      </Info>
    </Form>
  );
}
