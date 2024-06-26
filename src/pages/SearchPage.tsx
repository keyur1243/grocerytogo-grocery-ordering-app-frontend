import { useSearchGroceryStores } from "@/api/GroceryStoreApi";
import CategoryFilter from "@/components/CategoryFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  sortOption: string;
  searchQuery: string;
  page: number;
  selectedCategories: string[];
};

const Searchpage = () => {

        const { city } = useParams();
        const [searchState, setSearchState] = useState<SearchState>({
            searchQuery: "",
            page: 1,
            selectedCategories: [],
            sortOption: "bestMatch",
        });

        const [isExpanded, setIsExpanded] = useState<boolean>(false);
        const { results, isLoading } = useSearchGroceryStores(searchState, city);

        const setSortOption = (sortOption: string) => {
          setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page: 1,
          }));
        };

        const setSelectedCategories = (selectedCategories: string[]) => {
          setSearchState((prevState) => ({
            ...prevState,
            selectedCategories,
            page: 1,
          }));
        };
      
        const setPage = (page: number) => {
          setSearchState((prevState) => ({
            ...prevState,
            page,
          }));
        };

        const setSearchQuery = (searchFormData: SearchForm) => {
            setSearchState((prevState) => ({
              ...prevState,
              searchQuery: searchFormData.searchQuery,
              page: 1,
            }));
          };


          const resetSearch = () => {
            setSearchState((prevState) => ({
              ...prevState,
              searchQuery: "",
              page: 1,
            }));
          };
          

        if (isLoading) {
            <span>Loading ...</span>;
          }
        
          if (!results?.data || !city) {
            return <span>No results found</span>;
          }


        return (
            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
                <div id="categories-list">
                <CategoryFilter
                   selectedCategories={searchState.selectedCategories}
                   onChange={setSelectedCategories}
                   isExpanded={isExpanded}
                   onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
                  />

                </div>
                <div id="main-content" className="flex flex-col gap-5">
                    <SearchBar 
                        searchQuery={searchState.searchQuery}
                        onSubmit={setSearchQuery} 
                        placeHolder="Search by category or Grocery-Store Name"
                        onReset={resetSearch}
                        />
                    <div className="flex justify-between flex-col gap-3 lg:flex-row">
                      <SearchResultInfo total={results.pagination.total} city={city} />
                          <SortOptionDropdown
                             sortOption={searchState.sortOption}
                             onChange={(value) => setSortOption(value)}
                           />
                    </div>
                    {results.data.map((groceryStore) => (
                      <SearchResultCard groceryStore={groceryStore} />
                  ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Searchpage;