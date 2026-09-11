import { ArrowRight, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../schema/loginSchema";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Data", data);
    navigate("/admin/dashboard/");
    toast.success("Login Successfull");
  };
  return (
    <div className="min-h-screen font-karla lg:flex">
      <section className="relative hidden min-h-screen w-1/2 overflow-hidden bg-optional lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-primary/10"></div>

        <div className="absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full border border-primary/10"></div>

        <div className="absolute -bottom-48 -left-48 h-[600px] w-[600px] rounded-full border border-primary/5"></div>

        <div className="absolute right-24 top-32 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>

        <div className="absolute left-20 top-32 h-2 w-2 rounded-full bg-primary/50"></div>

        <div className="absolute right-32 bottom-40 h-2 w-2 rounded-full bg-primary/40"></div>

        <div className="relative z-10 px-12 pt-12 xl:px-16 xl:pt-14">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <span className="font-cormorant text-3xl font-bold text-white">
                A
              </span>
            </div>

            <div>
              <h1 className="font-cormorant text-3xl font-semibold tracking-wide text-white">
                ADMIN
              </h1>

              <p className="text-[9px] uppercase tracking-[0.35em] text-white/40">
                Management Portal
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 px-12 xl:px-16">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-primary"></span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-primary">
              Control Center
            </span>
          </div>

          <h2 className="max-w-xl font-cormorant text-6xl font-medium leading-[0.88] text-white xl:text-7xl">
            Everything
            <span className="block italic text-primary">under control.</span>
          </h2>

          <p className="mt-8 max-w-md text-sm leading-7 text-white/50">
            Manage your platform, monitor activity, and keep your business
            running smoothly from one secure place.
          </p>

          <div className="mt-10 flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <span className="text-sm text-primary">✓</span>
              </div>

              <div>
                <p className="text-xs font-medium text-white">Secure</p>

                <p className="text-[10px] text-white/35">Protected access</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <span className="text-sm text-primary">✓</span>
              </div>

              <div>
                <p className="text-xs font-medium text-white">Simple</p>

                <p className="text-[10px] text-white/35">Easy management</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-[-80px] right-[-20px] select-none">
          <span className="font-cormorant text-[420px] font-semibold leading-none text-white/[0.025]">
            A
          </span>
        </div>

        <div className="relative z-10 mx-12 mb-8 border-t border-white/10 pt-5 xl:mx-16">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">
              Admin Dashboard
            </span>

            <span className="text-[9px] uppercase tracking-[0.3em] text-primary/60">
              Secure Portal
            </span>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white px-6 py-12 sm:px-10 lg:w-1/2 lg:px-16">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-bl-full bg-primary/[0.035]"></div>

        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-tr-full bg-primary/[0.035]"></div>

        <div className="relative z-10 w-full max-w-md">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
              <span className="font-cormorant text-2xl font-bold text-white">
                A
              </span>
            </div>

            <div>
              <h1 className="font-cormorant text-2xl font-semibold text-secondary">
                ADMIN
              </h1>

              <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400">
                Management Portal
              </p>
            </div>
          </div>

          <div className="mb-9">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>

              <span className="text-[12px] font-semibold uppercase tracking-[0.3em] text-primary">
                Admin Portal
              </span>
            </div>

            <h2 className="font-cormorant text-5xl font-semibold leading-none text-secondary sm:text-6xl">
              Welcome back
            </h2>

            <p className="mt-4 max-w-sm text-[14px] leading-6 text-gray-400">
              Sign in to continue managing your dashboard.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-secondary">
                Email Address
              </label>

              <div className="relative">
                <input
                  type="email"
                  placeholder="admin@example.com"
                  {...register("email")}
                  className={`h-14 w-full rounded-xl border bg-gray-50 px-5 pr-12 text-sm text-secondary outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                      : "border-gray-200 focus:border-primary focus:ring-primary/10"
                  }`}
                />

                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={20} />
                </span>
              </div>

              {errors.email && (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-[10px] font-bold">
                    !
                  </span>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-[12px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className={`h-14 w-full rounded-xl border bg-gray-50 px-5 pr-12 text-sm text-secondary outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                    errors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                      : "border-gray-200 focus:border-primary focus:ring-primary/10"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-gray-400 transition-colors hover:text-primary"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-[10px] font-bold">
                    !
                  </span>
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="group flex h-14 w-full items-center justify-between rounded-xl bg-button px-6 text-[13px] font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#35a928]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-xl hover:shadow-[#35a928]/25 cursor-pointer"
            >
              <span>Sign In</span>

              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={20} />
              </span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;
