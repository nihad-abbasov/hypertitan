import styles from "../Account.module.css";
import { useState } from "react";
import axiosInstance from "../../../config/axios";
import { useRouter } from "next/navigation";
import { ConfirmActivation } from "./ConfirmActivation";
import { useAppDispatch } from "../../../app/redux/store";
import { addTokens } from "../../../app/redux/features/authSlice";
import { AuthError } from "../AuthError/AuthError";
import { Loading } from "@components/Loading/Loading";

export const Register = ({ handleLoginSignupState }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    password: "",
    email: "",
    code: "",
  });
  const [code, setCode] = useState(null);
  const [activationCode, setActivationCode] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    surname: "",
    password: "",
  });
  const [isAboutToRedirect, setIsAboutToRedirect] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      email: formData.email,
      name: formData.firstname,
      surname: formData.surname,
      password: formData.password,
      password_confirm: formData.password,
    };

    try {
      setLoading(true);
      setError({
        password: "",
        email: "",
        code: "",
      });
      const response = await axiosInstance.post(
        "/accounts/register/",
        requestBody
      );
      if (response.data.code) {
        setCode(response.data.code);
      }
    } catch (error) {
      const errorData = error?.response?.data;
      if (errorData?.email) {
        setError((prev) => ({
          ...prev,
          email: errorData.email?.[0] || "",
        }));
      }
      if (errorData?.error) {
        setError((prev) => ({
          ...prev,
          password: errorData.error?.[0] || "",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleActivationSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      activation_code: activationCode,
    };

    try {
      setLoading(true);
      setError({
        password: "",
        email: "",
        code: "",
      });
      const response = await axiosInstance.post(
        `/accounts/activate/${code}/`,
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

        setIsAboutToRedirect(true);

        setTimeout(() => {
          setIsAboutToRedirect(false);
          handleLoginSignupState();
        }, 3000);
      }
    } catch (error) {
      const errorData = error?.response?.data;
      if (errorData?.error) {
        setError((prev) => ({
          ...prev,
          code: "Incorrect confirmation code, please try again",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  if (code) {
    return isAboutToRedirect ? (
      <div className="flex flex-col items-center justify-center">
        <Loading className="h-[100]" />
        Qeydiyyatınız uğurludur
      </div>
    ) : (
      <ConfirmActivation
        handleActivationSubmit={handleActivationSubmit}
        activationCode={activationCode}
        loading={loading}
        setActivationCode={(newValue) => {
          setError((prev) => ({
            ...prev,
            code: "",
          }));
          setActivationCode(newValue);
        }}
        error={error.code}
      />
    );
  }

  return (
    <div id={styles.login_containerRegister}>
      <h3>Qeydiyyat</h3>

      <form onSubmit={handleFormSubmit} name="registerForm">
        <div className={styles.input_wrapper}>
          <label htmlFor="email">
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
          {error.email && <AuthError>{error.email}</AuthError>}
        </div>
        <div className={`${styles.input_wrapper} ${styles.username}`}>
          <label htmlFor="firstname">
            <span>Ad</span>
          </label>
          <input
            value={formData.firstname}
            onChange={handleFormChange}
            required
            type="text"
            name="firstname"
            id="firstname"
          />
        </div>
        <div className={`${styles.input_wrapper} ${styles.username}`}>
          <label htmlFor="surname">
            <span>Soyad</span>
          </label>
          <input
            value={formData.surname}
            onChange={handleFormChange}
            required
            type="text"
            name="surname"
            id="surname"
          />
        </div>
        <div className={styles.input_wrapper}>
          <label htmlFor="password">
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

          {error.password && <AuthError>{error.password}</AuthError>}
        </div>
        <p className={`${styles.privacy_text} mb-[10px]`}>
          Şəxsi məlumatlarınız sifarişinizi həyata keçirmək, bu veb-saytdakı
                təcrübənizi dəstəkləmək və saytımızın{" "}
                <a target="_blank" href="/privacy">
                  gizlilik siyasətində
                </a>{" "} təsvir olunan digər məqsədlər üçün istifadə ediləcək.
        </p>
        <button type="submit" disabled={loading}>
          Qeydiyyatdan keçin
        </button>
        {/* <div id="password_details">
              <div className="rememberMe">
                <input type="checkbox" name="checkbox" id="checkbox" />
                <label htmlFor="checkbox">Yadda saxla</label>
              </div>
              <a className="forgotPassword">Forgot Password?</a>
            </div> */}
      </form>
    </div>
  );
};
