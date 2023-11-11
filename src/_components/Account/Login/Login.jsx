import styles from "../Account.module.css";
import { useState } from "react";
import axiosInstance from "../../../config/axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../../app/redux/store";
import { addTokens } from "../../../app/redux/features/authSlice";
import { AuthError } from "../AuthError/AuthError";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      email: formData.email,
      password: formData.password,
    };
    try {
      setLoading(true);
      setError("");
      const response = await axiosInstance.post(
        "/accounts/login/",
        requestBody
      );

      if (response.data.token) {
        localStorage.setItem("accessToken", response.data.token.access);
        localStorage.setItem("refreshToken", response.data.token.refresh);

        dispatch(
          addTokens({
            refreshToken: response.data.token.refresh,
            accessToken: response.data.token.access,
          })
        );

        router.push("/");
      }
    } catch (error) {
      const errorData = error?.response?.data;

      if (errorData?.error) {
        setError(errorData.error?.[0] || "");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id={styles.login_container} className="w-[45%]">
      <h3>Daxil olun</h3>
      {error && <AuthError>{error}</AuthError>}
      <form onSubmit={handleFormSubmit} name="loginForm">
        <div className="flex flex-col items-start mb-[1em]">
          <label htmlFor="email" className="mb-[3px]">
            <span>Email</span>
          </label>
          <input
            value={formData.email}
            onChange={handleFormChange}
            required
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col items-start mb-[1em]">
          <label htmlFor="password" className="mb-[3px]">
            <span>Şifrə</span>
          </label>
          <input
            value={formData.password}
            onChange={handleFormChange}
            required
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button type="submit" disabled={loading}>
          Daxil ol
        </button>
        {/* <div id={styles.password_details}>
          <div className={styles.rememberMe}>
            <input required type="checkbox" name="checkbox" id="checkbox" />
            <label htmlFor="checkbox">Yadda saxla</label>
          </div>
          <a className={styles.forgotPassword}>Forgot Password?</a>
        </div> */}
      </form>
    </div>
  );
};
