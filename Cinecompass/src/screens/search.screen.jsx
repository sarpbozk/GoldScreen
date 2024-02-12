import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import SearchBar from "../components/search_bar";
import useResults from "../hooks/search.hooks";
import ResultsList from "../components/results_list";
import colors from "../constants/colors";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const { searchAPI, results, errorMessage } = useResults();
  const { backgroundStyle } = styled(colors.dark_theme);
  return (
    <View style={backgroundStyle}>
      <SearchBar
        term={query}
        onTermChange={setQuery}
        onTermSubmit={() => searchAPI(query)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ResultsList title={"results"} results={results} />
    </View>
  );
};
export default SearchScreen;
const styled = (themePalette) =>
  StyleSheet.create({
    backgroundStyle: {
      flex: 1,
      backgroundColor: themePalette.primary,
    },
  });
