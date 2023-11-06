export const Map = ({ width, height }) => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1519.6474554096112!2d49.8424975!3d40.380156!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307dd58a6bb8df%3A0xcc520e7899870272!2sHyperTitan!5e0!3m2!1sen!2saz!4v1695643954589!5m2!1sen!2saz"
      style={{ border: 0, maxWidth: "100%" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="rounded-md"
      width={width}
      height={height}
    ></iframe>
  );
};
