import styles from "../Account.module.css";
import { AuthError } from "../AuthError/AuthError";

export const ConfirmActivation = ({
  handleActivationSubmit,
  activationCode,
  loading,
  setActivationCode,
  error,
}) => {
  return (
    <form id={styles.confirmationForm} onSubmit={handleActivationSubmit} name="activationForm">
      <p>Təsdiqləmə kodu email ünvanınıza göndərildi.</p>
      <input
        value={activationCode}
        onChange={(e) => setActivationCode(e.target.value)}
        placeholder="Aktivasiya kodu"
        name="activationInput"
      />
      {error && <AuthError>{error}</AuthError>}
      <button disabled={loading} type="submit">
        Təsdiqlə
      </button>
    </form>
  );
};
