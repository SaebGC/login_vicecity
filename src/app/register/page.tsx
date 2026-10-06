import RegisterForm from "@/features/auth/components/RegisterForm";
import { AuthLayout } from "@/features/auth/components/AuthLayout";

export const metadata = {
  title: "Register - Vice City Iguana Club",
  description: "Create your Vice City Iguana Club account",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title={
        <>
          Become A <br /> Member
        </>
      }
      description="Sign up today to book courts, manage reservations, and experience peak performance at the finest sports complex in Vice City."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
