import loadingStyles from "./Loading.module.css";

export const Loading = () => {
  return (
    <div className="block h-[200px] relative tracking-[0.5px] w-full mx-auto">
      <span
        className={`${loadingStyles.smooth} ${loadingStyles.spinner}`}
      ></span>
    </div>
  );
};
