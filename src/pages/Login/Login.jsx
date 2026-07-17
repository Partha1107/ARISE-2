import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "../../lib/supabase";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const validationErrors = {};

    if (!formData.email) {
      validationErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    if (!isLogin) {
      if (!formData.fullName) {
        validationErrors.fullName = "Full name is required.";
      }

      if (!formData.confirmPassword) {
        validationErrors.confirmPassword = "Please confirm your password.";
      } else if (formData.password !== formData.confirmPassword) {
        validationErrors.confirmPassword = "Passwords do not match.";
      }
    }

    return validationErrors;
  };
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  
    if (error) {
      alert(error.message);
    }
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setLoading(true);

  try {
    if (isLogin) {
      // Login
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      navigate("/dashboard");
    } else {
      // Sign Up
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            fullName: formData.fullName,
          },
        },
      });

      if (error) throw error;

      alert(
        "Account created successfully!"
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
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center text-white mb-2">
          ARISE
        </h1>

        <p className="text-center text-gray-400 mb-6">
          {isLogin ? "Welcome Back!" : "Create Your Account"}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {!isLogin && (
            <div>
              <label className="block text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 outline-none"
              />
              {errors.fullName && (
                <p className="text-sm text-red-400 mt-1">{errors.fullName}</p>
              )}
            </div>
          )}

          {/* Email field */}
          <div>
            <label className="block text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 outline-none"
            />
            {errors.email && (
              <p className="text-sm text-red-400 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password field with show/hide functionality */}
          <div>
            <label className="block text-gray-300 mb-2">
              Password
            </label>
                  
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-3 pr-12 rounded-lg bg-slate-800 text-white border border-slate-700 outline-none"
              />
              {errors.password && (
                <p className="text-sm text-red-400 mt-1">{errors.password}</p>
              )}

              <button type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400" />
                ) : (
                  <FaEye className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password field for Sign Up */}
          {!isLogin && (
            <div>
              <label className="block text-gray-300 mb-2">
                Confirm Password 
              </label>

              <input
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 outline-none"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-400 mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="accent-blue-500"
            />

            <label htmlFor="remember" className="text-gray-300">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-500 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-white text-black py-3 rounded-lg font-semibold"
        >
          Continue with Google
        </button>

      </div>
    </div>
  );
}

export default Login;