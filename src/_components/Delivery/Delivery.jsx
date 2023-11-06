export const Delivery = ({ deliveryContent }) => {
  return (
    <div
      className="container text-black dark:text-white !my-[2em]"
    >
      <h1 className="text-[40px] font-semibold text-center my-[1em]">Çatdırılma və ödəniş</h1>

      {deliveryContent.map((content, index) => {
        return (
          <div
            key={index}
            className="border border-gray p-[20px] rounded-[8px] mb-[1em] last:mb-0"
            style={{ boxShadow: "3px 3px 4px 0 rgba(0, 0, 0, 0.2)" }}
          >
            <h3 className="mb-[10px] text-left text-[25px] font-medium">{content.title}</h3>
            <p className="font-extralight">{content.content}</p>
          </div>
        );
      })}
    </div>
  );
};
