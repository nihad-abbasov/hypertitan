import "./NewProducts.css";
import Image from "next/image";

const newProducts = [
  { id: 1, url: "facebook.com", name: "product name", price: 5000 },
  { id: 2, url: "facebook.com", name: "product name", price: 5000 },
  { id: 3, url: "facebook.com", name: "product name", price: 5000 },
  { id: 4, url: "facebook.com", name: "product name", price: 5000 },
  { id: 5, url: "facebook.com", name: "product name", price: 5000 },
];

export const NewProducts = async () => {
  return (
    <section id="new-products">
      <h1>New Products</h1>
      <ul>
        {newProducts.map((komp) => (
          <li className="card" key={komp._id}>
            <Image
              width="300"
              height="220"
              alt={komp?.name}
              src={komp?.img_url}
            />

            <span>
              <p>
                {komp?.name} - ${komp?.price}
              </p>
              <a target="_blank" href="#">
                Məhsula bax
              </a>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
