"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eyebrow } from "@/components/ui";
import { Icon } from "@/components/icons";
import { useCart } from "@/components/CartContext";

type Mode = "login" | "register";

export default function LoginPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab } = use(searchParams);
  const router = useRouter();
  const { toast } = useCart();
  const [mode, setMode] = useState<Mode>(tab === "register" ? "register" : "login");
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [reg, setReg] = useState({ name: "", email: "", password: "" });

  const submitLogin = () => {
    if (!login.email || !login.password) {
      toast("Enter your email and password.");
      return;
    }
    toast("Demo only — connect this to your auth backend.");
    router.push("/");
  };

  const submitRegister = () => {
    if (!reg.name || !reg.email || !reg.password) {
      toast("Fill in your name, email and password.");
      return;
    }
    if (reg.password.length < 6) {
      toast("Password should be at least 6 characters.");
      return;
    }
    toast("Account created (demo) — connect this to your auth backend.");
    router.push("/");
  };

  return (
    <div className="page">
      <div className="wrap auth">
        <div className="auth-art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ila-banner2.jpg" alt="" aria-hidden="true" />
          <div className="auth-art-atmos" />
          <div className="auth-art-copy">
            <Eyebrow>ila — a modern spice legacy</Eyebrow>
            <h2>Fresh from the estate, straight to your door.</h2>
            <p>Sign in to track orders, save favourites, and check out faster next time.</p>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-tabs">
            <button
              className={mode === "login" ? "is-on" : ""}
              onClick={() => setMode("login")}
            >
              Login
            </button>
            <button
              className={mode === "register" ? "is-on" : ""}
              onClick={() => setMode("register")}
            >
              Register
            </button>
          </div>

          {mode === "login" ? (
            <>
              <h1 className="auth-title">Welcome back</h1>
              <p className="auth-sub">Log in to your ila account.</p>

              <label className="field fill">
                <span>Email</span>
                <input
                  type="email"
                  value={login.email}
                  onChange={(e) => setLogin({ ...login, email: e.target.value })}
                  placeholder="you@email.com"
                />
              </label>
              <label className="field fill">
                <span>Password</span>
                <div className="auth-pass">
                  <input
                    type={show ? "text" : "password"}
                    value={login.password}
                    onChange={(e) => setLogin({ ...login, password: e.target.value })}
                    placeholder="••••••••"
                    onKeyDown={(e) => e.key === "Enter" && submitLogin()}
                  />
                  <button type="button" className="auth-eye" onClick={() => setShow((s) => !s)} aria-label="Toggle password visibility">
                    <Icon.chev />
                  </button>
                </div>
              </label>

              <div className="auth-row">
                <label className="auth-remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="link" onClick={() => toast("Password reset — connect this to your auth backend.")}>
                  Forgot password?
                </button>
              </div>

              <button className="btn btn-primary btn-lg btn-block" onClick={submitLogin}>
                Log in
                <Icon.arrow />
              </button>

              <p className="auth-switch">
                New to ila?{" "}
                <button type="button" onClick={() => setMode("register")}>
                  Create an account
                </button>
              </p>
            </>
          ) : (
            <>
              <h1 className="auth-title">Create your account</h1>
              <p className="auth-sub">Join ila for faster checkout and order tracking.</p>

              <label className="field fill">
                <span>Full name</span>
                <input
                  value={reg.name}
                  onChange={(e) => setReg({ ...reg, name: e.target.value })}
                  placeholder="Meera Nair"
                />
              </label>
              <label className="field fill">
                <span>Email</span>
                <input
                  type="email"
                  value={reg.email}
                  onChange={(e) => setReg({ ...reg, email: e.target.value })}
                  placeholder="you@email.com"
                />
              </label>
              <label className="field fill">
                <span>Password</span>
                <div className="auth-pass">
                  <input
                    type={show ? "text" : "password"}
                    value={reg.password}
                    onChange={(e) => setReg({ ...reg, password: e.target.value })}
                    placeholder="At least 6 characters"
                    onKeyDown={(e) => e.key === "Enter" && submitRegister()}
                  />
                  <button type="button" className="auth-eye" onClick={() => setShow((s) => !s)} aria-label="Toggle password visibility">
                    <Icon.chev />
                  </button>
                </div>
              </label>

              <button className="btn btn-primary btn-lg btn-block" onClick={submitRegister}>
                Create account
                <Icon.arrow />
              </button>

              <p className="auth-switch">
                Already have an account?{" "}
                <button type="button" onClick={() => setMode("login")}>
                  Log in
                </button>
              </p>
            </>
          )}

          <p className="auth-terms">
            By continuing you agree to ila&apos;s{" "}
            <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
