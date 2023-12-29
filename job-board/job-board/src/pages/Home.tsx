import { FormSubmitEvent, InputChangeEvent } from "@utils/types";
import Search from "componets/Search";
import { useState } from "react";

function Home() {
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e: InputChangeEvent) => {
    setSearchText(e.target.value);
  };
  const handleSearch = (e: FormSubmitEvent) => {
    e.preventDefault();
  };
  return (
    <div className="max-w-[1200px] xl:mx-auto mx-4 py-5">
      <Search
        search={searchText}
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
      />
    </div>
  );
}

export default Home;
