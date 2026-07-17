import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaTimes,
  FaGoogle,
} from "react-icons/fa";
import { supabase } from "../../lib/supabase";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Notification State
  const [notification, setNotification] = useState({
    show: false,
    type: "info",
    message: "",
  });

  // Show Notification
  const showNotification = (type, message) => {
    setNotification({
      show: true,
      type,
      message,
    });
  };

  // Auto Hide
  useEffect(() => {
    if (!notification.show) return;

    const timer = setTimeout(() => {
      setNotification((prev) => ({
        ...prev,
        show: false,
      }));
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification]);

  const validate = () => {
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      validationErrors.email =
        "Please enter a valid email address.";
    }

    if (!formData.password) {
      validationErrors.password =
        "Password is required.";
    } else if (formData.password.length < 8) {
      validationErrors.password =
        "Password must be at least 8 characters.";
    }

    if (!isLogin) {
      if (!formData.fullName.trim()) {
        validationErrors.fullName =
          "Full Name is required.";
      }

      if (
        formData.password !==
        formData.confirmPassword
      ) {
        validationErrors.confirmPassword =
          "Passwords do not match.";
      }
    }

    return validationErrors;
  };
  // Google Login
  const handleGoogleLogin = async () => {
    setErrors({});

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      showNotification("error", error.message);
    }
  };

  // Login / Signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      showNotification(
        "warning",
        "Please fix the highlighted fields."
      );

      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN
        const { data, error } =
          await supabase.auth.signInWithPassword({
            email: formData.email.trim(),
            password: formData.password,
          });

        if (error) throw error;

        // Email Verification Check
        if (!data.user.email_confirmed_at) {
          await supabase.auth.signOut();

          showNotification(
            "warning",
            "Please verify your email before logging in."
          );

          setLoading(false);
          return;
        }

        showNotification(
          "success",
          "Login Successful! Redirecting..."
        );

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        // SIGN UP
        const { error } = await supabase.auth.signUp({
          email: formData.email.trim(),
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            },
          },
        });

        if (error) throw error;

        showNotification(
          "success",
          "Account created successfully! Please verify your email."
        );

        setIsLogin(true);

        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      let { message } = error;

      if (
        message.toLowerCase().includes("invalid login")
      ) {
        message = "Invalid email or password.";
      }

      if (
        message.toLowerCase().includes("already")
      ) {
        message =
          "An account with this email already exists.";
      }

      showNotification("error", message);
    } finally {
      setLoading(false);
    }
  };

  // Notification Colors
  const notificationStyles = {
    success: {
      bg: "bg-green-500/10",
      border: "border-green-500",
      text: "text-green-400",
      icon: <FaCheckCircle />,
    },

    error: {
      bg: "bg-red-500/10",
      border: "border-red-500",
      text: "text-red-400",
      icon: <FaExclamationCircle />,
    },

    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500",
      text: "text-yellow-400",
      icon: <FaExclamationTriangle />,
    },

    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500",
      text: "text-blue-400",
      icon: <FaInfoCircle />,
    },
  };

  const currentStyle =
    notificationStyles[notification.type];
return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-10">
    <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-slate-800">

      {/* Logo */}
      <h1 className="text-4xl font-extrabold text-center text-white tracking-widest">
        ARISE
      </h1>

      <p className="text-center text-gray-400 mt-2 mb-6">
        {isLogin
          ? "Welcome back, Hunter."
          : "Create your Hunter Account"}
      </p>

      {/* Notification */}
      {notification.show && (
        <div
          className={`flex items-start gap-3 mb-6 rounded-xl border p-4 shadow-lg animate-fadeIn
          ${currentStyle.bg}
          ${currentStyle.border}
          ${currentStyle.text}`}
        >
          <div className="text-xl mt-1">
            {currentStyle.icon}
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium">
              {notification.message}
            </p>
          </div>

          <button
            onClick={() =>
              setNotification((prev) => ({
                ...prev,
                show: false,
              }))
            }
            className="hover:opacity-70 transition"
          >
            <FaTimes />
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {!isLogin && (
          <div>
            <label className="block text-gray-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={formData.fullName}
              placeholder="John Doe"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName: e.target.value,
                })
              }
              className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500 transition"
            />

            {errors.fullName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.fullName}
              </p>
            )}
          </div>
        )}

        {/* Email */}

        <div>

          <label className="block text-gray-300 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500 transition"
          />

          {errors.email && (
            <p className="text-red-400 text-sm mt-1">
              {errors.email}
            </p>
          )}

        </div>

        {/* Password */}

        <div>

          <label className="block text-gray-300 mb-2">
            Password
          </label>

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 pr-12 text-white outline-none focus:border-blue-500 transition"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
            >
              {showPassword
                ? <FaEyeSlash />
                : <FaEye />}
            </button>

          </div>

          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password}
            </p>
          )}

        </div>
        {/* Confirm Password */}

        {!isLogin && (
          <div>

            <label className="block text-gray-300 mb-2">
              Confirm Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500 transition"
            />

            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}

          </div>
        )}

        {/* Remember Me */}

        {isLogin && (
          <div className="flex items-center justify-between">

            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">

              <input
                type="checkbox"
                className="accent-blue-500"
              />

              Remember Me

            </label>

            <button
              type="button"
              className="text-blue-400 hover:text-blue-300 text-sm transition"
            >
              Forgot Password?
            </button>

          </div>
        )}

        {/* Login Button */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition duration-300 flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-100"
                  fill="currentColor"
                  d="M22 12a10 10 0 00-10-10v4a6 6 0 016 6h4z"
                />
              </svg>

              Please wait...
            </>
          ) : isLogin ? (
            "Login"
          ) : (
            "Create Account"
          )}
        </button>

        {/* Divider */}

        <div className="flex items-center gap-4">

          <div className="flex-1 h-px bg-slate-700" />

          <span className="text-gray-500 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-slate-700" />

        </div>

        {/* Google */}

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
        >
          <FaGoogle />

          Continue with Google
        </button>

      </form>

      {/* Switch Login & Signup */}

      <p className="text-center text-gray-400 mt-8">

        {isLogin
          ? "Don't have an account?"
          : "Already have an account?"}

        <button
          onClick={() => {
            setErrors({});
            setNotification({
              show: false,
              type: "info",
              message: "",
            });

            setFormData({
              fullName: "",
              email: "",
              password: "",
              confirmPassword: "",
            });

            setIsLogin(!isLogin);
          }}
          className="ml-2 text-blue-400 hover:text-blue-300 font-semibold transition"
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>

      </p>

    </div>
  </div>
);

}

export default Login;