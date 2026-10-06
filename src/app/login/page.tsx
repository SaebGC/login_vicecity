import LoginForm from "@/features/auth/components/LoginForm";
import { AuthLayout } from "@/features/auth/components/AuthLayout";

export const metadata = {
  title: "Login - Vice City Iguana Club",
  description: "Access your Vice City Iguana Club account",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title={
        <>
          Welcome To <br /> The Club
        </>
      }
      description="Experience the premium sports complex designed for your maximum performance."
    >
      <LoginForm />
    </AuthLayout>
  );
}
