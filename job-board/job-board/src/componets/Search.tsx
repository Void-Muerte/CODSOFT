import { FormSubmitEvent, InputChangeEvent } from "@utils/types";

type SearchProps = {
  search: string;
  handleSearchChange: (e: InputChangeEvent) => void;
  handleSearch: (e: FormSubmitEvent) => void;
};
function Search({ search, handleSearchChange, handleSearch }: SearchProps) {
  return (
    <form
      onSubmit={handleSearch}
      className=" flex flex-row space-x-2 p-0.5 sm:mx-0 mx-5; rounded-xl w-full border-[0.05rem] border-sky-700 "
    >
      <input
        type="text"
        name="search"
        value={search}
        onChange={handleSearchChange}
        className="w-[calc(100%-88px)] px-2 py-1.5 border-none rounded-l-xl focus:outline-none"
      />
      <button
        type="submit"
        className="text-white bg-sky-900 px-4 w-[80px] py-1.5 rounded-xl"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
