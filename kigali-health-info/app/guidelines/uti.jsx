import React, { useState } from "react"; 
import { View, Text, Pressable, StyleSheet, ScrollView, TextInput } from "react-native"; // Added TextInput
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from "../context/FavoritesContext"; 
import utiData from "../../data/uti-adult.json";

// Add searchQuery to the props here!
const CollapsibleSection = ({ section, searchQuery }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // --- NEW HIGHLIGHTER FUNCTION ---
  // This chops the text into an array and bolds the parts that match the search
  const highlightText = (text) => {
    if (!searchQuery.trim() || !text) return text;

    // Create a case-insensitive regular expression to find the search term
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        // If the chunk matches the search, make it bold and add a highlight color!
        <Text key={index} style={styles.highlightedText}>{part}</Text>
      ) : (
        // Otherwise, return normal text
        <Text key={index}>{part}</Text>
      )
    );
  };

  return (
    <View style={styles.sectionContainer}>
      <Pressable 
        style={styles.sectionBanner} 
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.sectionBannerText}>{highlightText(section.heading)}</Text>
        <Ionicons 
          name={isExpanded ? "chevron-up" : "chevron-down"} 
          size={24} 
          color="#fff" 
        />
      </Pressable>

      {isExpanded && (
        <View style={styles.contentArea}>
          {section.body && (
            <Text style={styles.bodyText}>{highlightText(section.body)}</Text>
          )}

          {section.bullets && (
            <View style={styles.bulletContainer}>
              {section.bullets.map((bullet, bulletIndex) => (
                <View key={bulletIndex} style={styles.bulletRow}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>{highlightText(bullet)}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default function UTIScreen() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const pageInfo = { route: "/guidelines/uti", name: utiData.title };
  const isFav = isFavorite(pageInfo.route);

  // 1. NEW STATE: Track the search query
  const [searchQuery, setSearchQuery] = useState("");

  // 2. THE FILTER LOGIC
  // This looks at every section and keeps it only if the heading, body, or any bullet matches the search text
  const filteredSections = utiData.sections.filter((section) => {
    // If the search bar is empty, show everything
    if (searchQuery.trim() === "") {
      return true;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    
    // Check if the query is in the heading
    const matchesHeading = section.heading.toLowerCase().includes(lowerCaseQuery);
    
    // Check if the query is in the body (and make sure the body actually exists first!)
    const matchesBody = section.body ? section.body.toLowerCase().includes(lowerCaseQuery) : false;
    
    // Check if the query is in any of the bullet points
    const matchesBullets = section.bullets 
      ? section.bullets.some(bullet => bullet.toLowerCase().includes(lowerCaseQuery)) 
      : false;

    // Keep the section if ANY of those matched
    return matchesHeading || matchesBody || matchesBullets;
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </Pressable>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>{utiData.title}</Text>
        <Pressable onPress={() => toggleFavorite(pageInfo)}>
          <Ionicons 
            name={isFav ? "star" : "star-outline"} 
            size={32} 
            color={isFav ? "#FFD700" : "#ccc"} 
          />
        </Pressable>
      </View>

      {/* 3. THE SEARCH BAR */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchBar}
          placeholder="Search this guideline..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery} // Updates our state every time the user types
          clearButtonMode="while-editing" // Adds a handy "X" to clear text on iOS
        />
      </View>
      
      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        
        {/* 4. LOOP OVER FILTERED DATA INSTEAD OF ALL DATA */}
        {filteredSections.length > 0 ? (
          filteredSections.map((section, index) => (
            <CollapsibleSection 
              key={index} 
              section={section} 
              searchQuery={searchQuery}
            />
          ))
        ) : (
          <Text style={styles.noResultsText}>No sections match your search.</Text>
        )}

        <View style={{ height: 40 }} />
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 60 },
  backButton: { position: "absolute", top: 50, left: 20, zIndex: 10, padding: 8 },
  backArrow: { fontSize: 28, fontWeight: "bold", color: "#007AFF" },
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 15, gap: 10 },
  title: { fontSize: 28, fontWeight: "bold" },
  
  highlightedText: {
    fontWeight: 'bold',
    backgroundColor: '#fff3cd',
    color: '#000',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic'
  },

  scrollArea: { flex: 1, paddingHorizontal: 20 },
  sectionContainer: { marginBottom: 10 },
  sectionBanner: {
    backgroundColor: "#9a96c7", 
    paddingVertical: 10, 
    paddingHorizontal: 15,
    borderRadius: 8, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  sectionBannerText: { color: "#fff", fontSize: 18, fontWeight: "bold", flex: 1 },
  contentArea: { paddingHorizontal: 5, paddingTop: 5, paddingBottom: 15 },
  bodyText: { fontSize: 16, color: "#333", lineHeight: 24, marginTop: 10 },
  bulletContainer: { marginTop: 10 },
  bulletRow: { flexDirection: 'row', marginBottom: 10 },
  bulletPoint: { fontSize: 18, color: "#333", marginRight: 10, marginTop: -2 },
  bulletText: { fontSize: 16, color: "#333", lineHeight: 24, flex: 1 }
});