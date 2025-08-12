import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Github } from "lucide-react";
import dashboardPreview from "@/assets/dashboard-preview.svg";
import { Helmet } from "react-helmet-async";

interface Props {
  variant?: "desktop" | "mobile";
}

export default function SimpleAuthLanding({ variant = "desktop" }: Props) {
  const [email, setEmail] = useState("");

  return (
    <>
      <Helmet>
        <title>Property Management Platform | Create Account</title>
        <meta name="description" content="Create your account for our property management platform. Sign up with Google or GitHub and manage listings, transactions, and workspaces in one place." />
        <link rel="canonical" href="/" />
      </Helmet>

      <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <article className="w-full max-w-5xl bg-card text-card-foreground border border-border rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Messaging */}
            <section className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-border">
              <h1 className="text-2xl md:text-3xl font-semibold leading-tight mb-6">
                Ship experiences
                <br />
                faster, together
              </h1>

              <div className="relative mb-8">
                <div className="rounded-xl border border-border overflow-hidden bg-secondary/40">
                  <img
                    src={dashboardPreview}
                    alt="Dashboard preview for property management platform"
                    loading="lazy"
                    className="w-full h-auto"
                  />
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  "Generate code for 10+ frameworks",
                  "Connect your components and tokens",
                  "Make designs interactive with AI",
                  "APIs to publish to your live site or app",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Right: Auth card */}
            <section className="p-8 md:p-10">
              <div className="mb-2 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-semibold">Create an account</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Already have an account? <a href="#" className="text-primary underline-offset-2 hover:underline">Log in</a>
                </p>
              </div>

              <div className="space-y-3 mt-6">
                <Button variant="secondary" className="w-full justify-start gap-3">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-primary/10 text-primary font-bold">G</span>
                  Continue With Google
                </Button>
                <Button variant="secondary" className="w-full justify-start gap-3">
                  <Github className="h-5 w-5" />
                  Continue With GitHub
                </Button>
              </div>

              <div className="flex items-center gap-3 my-6">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground whitespace-nowrap">Or, sign up with your email</span>
                <Separator className="flex-1" />
              </div>

              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <label className="text-sm font-medium" htmlFor="work-email">Work email *</label>
                <Input
                  id="work-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="stephanie@mycompany.com"
                  className="h-11"
                />

                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  By creating an account, I agree to the platform's
                  <a href="#" className="mx-1 text-primary underline-offset-2 hover:underline">terms of service</a>
                  and
                  <a href="#" className="ml-1 text-primary underline-offset-2 hover:underline">privacy policy</a>.
                </p>

                <Button type="submit" className="w-full h-11" disabled={!email}>
                  Get Started
                </Button>
              </form>

              <p className="mt-6 text-xs text-muted-foreground">
                New to the platform? <a className="text-primary underline-offset-2 hover:underline" href="#">Learn more</a>
              </p>
            </section>
          </div>
        </article>
      </main>
    </>
  );
}
