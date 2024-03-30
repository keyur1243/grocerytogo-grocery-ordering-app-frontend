import { SearchState } from "@/pages/SearchPage";
import { GroceryStoreSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const useSearchGroceryStores = (searchState: SearchState,city?: string) => {
    const createSearchRequest = async (): Promise<GroceryStoreSearchResponse> => {
        const params = new URLSearchParams();
        params.set("searchQuery", searchState.searchQuery);
        params.set("page", searchState.page.toString());
        params.set("selectedCategories", searchState.selectedCategories.join(","));
        params.set("sortOption", searchState.sortOption);
        const response = await fetch(
            `${API_BASE_URL}/api/groceryStore/search/${city}?${params.toString()}`
          );

    if (!response.ok) {
        throw new Error("Failed to get Grocery-Store");
      }
      return response.json();
  };
  const { data: results, isLoading } = useQuery(
    ["searchGroceryStores", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};