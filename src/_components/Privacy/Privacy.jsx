export const Privacy = ({ privacyContent }) => {
  return (
    <div className="container text-black dark:text-white my-[2em]">
      <h1 className="text-[40px] font-semibold my-[1em] text-center">Gizlilik şərtləri</h1>
      <div
        className="my-[1em] p-[20px] rounded-[8px] border border-gray"
        style={{ boxShadow: "3px 3px 4px 0 rgba(0, 0, 0, 0.2)" }}
      >
        {/* <p>{privacyContent.title}</p> */}
        <p>{privacyContent.content}</p>
      </div>
    </div>
  );
};
