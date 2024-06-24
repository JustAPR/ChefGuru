import { useContext } from "react";
import { FoodContext } from "./RecipeContext.jsx";
import SearchButton from "./RecipeResults.jsx";

function SearchRecipes() {
  const { setFood, setIsSearched } = useContext(FoodContext);

  function onChangeHandler(event) {
    setFood(event.target.value);
  }

  function onSearch() {
    setIsSearched(true);
  }

  return (
    <>
      <input
        className="searchBar"
        type="text"
        onChange={onChangeHandler}
        placeholder="..."
      />
      <SearchButton onSearch={onSearch} />
    </>
  );
}

export default SearchRecipes;
