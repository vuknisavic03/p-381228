import { useSignUp, useClerk, useUser, useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const SignUpPage = () => {
  const { signUp } = useSignUp();
  const { setActive } = useClerk();
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"manager" | "personal">("personal");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });
      

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
        const errorMessage = err?.errors?.[0]?.message || "Something went wrong.";
        setError(errorMessage);
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    try {
      await signUp.attemptEmailAddressVerification({ code });
      await setActive({ session: signUp.createdSessionId });

      // 🔐 1. Uzmi token od Clerk-a
      const token = await getToken();

      // 📡 2. Pošalji podatke backendu
      const response = await fetch('http://localhost:5000/public/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          role,
        }),
      });

      const data = await response.json();
      console.log('Signup response:', data);

      // ✅ 3. Redirect na osnovu role
      if (role === 'manager') {
        navigate('/workspace');
      } else {
        navigate('/dashboard');
      }

    } catch (err: any) {
        const errorMessage = err?.errors?.[0]?.message || "Something went wrong.";
        setError(errorMessage);
    }
  };

  useEffect(() => {
    const applyUserMetadataAndRedirect = async () => {
      if (isSignedIn && user && !user.publicMetadata.role) {
        try {
          await user.update({
            unsafeMetadata: { role },   // treba da se vrati na public najvrv
          });
          navigate(role === "manager" ? "/workspace" : "/dashboard");
        } catch (err) {
          console.error("Metadata update error", err);
        }
      }
    };

    applyUserMetadataAndRedirect();
  }, [isSignedIn, user, role, navigate]);

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-center">Create Your Account</h2>

      <form onSubmit={handleSignUp} autoComplete="on" className="space-y-4">
        <Input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="given-name"
          required
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => {setEmail(e.target.value); setError(null);}}
          autoComplete="email"
          required
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => {setPassword(e.target.value); setError(null);}}
          required
        />
        <Input
          placeholder="Phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          required={false}
        />

        <div className="flex gap-4 justify-center">
          <Button
            type="button"
            variant={role === "personal" ? "default" : "outline"}
            className="w-1/2"
            onClick={() => setRole("personal")}
          >
            Personal User
          </Button>
          <Button
            type="button"
            variant={role === "manager" ? "default" : "outline"}
            className="w-1/2"
            onClick={() => setRole("manager")}
          >
            Manager
          </Button>
        </div>

        {!pendingVerification ? (
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing up..." : "Sign Up"}</Button>
        ) : (
          <div className="space-y-3">
            <Input
              placeholder="Verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <Button type="button" onClick={handleVerify} className="w-full">
              Verify Email
            </Button>
          </div>
        )}
      </form>
      {error && (
        <p className="text-sm text-red-500 text-center mt-2">{error}</p>
      )}
    </div>
  );
};

export default SignUpPage;
