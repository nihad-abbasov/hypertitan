import loadingStyles from "./Loading.module.css";

export const Loading = () => {
  return (
    <div className={loadingStyles.spinner_wrapper}>
      <span
        className={`${loadingStyles.smooth} ${loadingStyles.spinner}`}
      ></span>
    </div>
  );
};
