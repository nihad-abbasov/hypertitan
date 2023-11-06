import styles from "./Filters.module.css";

export const PriceSort = ({ setPriceSort }) => {
  return (
    <div id={styles.filters} className="text-black dark:text-white mr-[20px] flex flex-col items-start">
      <label className="mr-[10px]">Filter by Price: </label>
      <select
        onChange={(e) => setPriceSort(e.target.value)}
        className="border-white dark:border-black py-[5px] px-[10px] rounded-sm bg-gray-500 text-white"
      >
        <option value="all">All</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>
    </div>
  );
};
