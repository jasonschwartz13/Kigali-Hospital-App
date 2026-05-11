import React, { useState } from "react"; 
import { View, Text, Pressable, StyleSheet, ScrollView, TextInput } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from "../context/FavoritesContext"; 
import { guidelinesList } from "../../data/index.js";

const CollapsibleSection = ({ section, searchQuery }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const highlightText = (text) => {
    if (!searchQuery.trim() || !text) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <Text key={index} style={styles.highlightedText}>{part}</Text>
      ) : (
        <Text key={index}>{part}</Text>
      )
    );
  };

  return (
    <View style={styles.sectionContainer}>
      <Pressable style={styles.sectionBanner} onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.sectionBannerText}>{highlightText(section.heading)}</Text>
        <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
      </Pressable>

      {isExpanded && (
        <View style={styles.contentArea}>
          {section.body && <Text style={styles.bodyText}>{highlightText(section.body)}</Text>}
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

export default function GuidelineTemplateScreen() {
  // get the ID from the URL (e.g., "uti-adult" or "cap")
  const { id } = useLocalSearchParams();
  
  // find the correct guideline data from our master list
  const activeData = guidelinesList.find(g => g.id === id);

  const { toggleFavorite, isFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");

  // if the URL ID doesn't match any JSON files, show an error
  if (!activeData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.title}>Guideline not found!</Text>
        <Pressable onPress={() => router.back()} style={{ marginTop: 20 }}>
          <Text style={{ color: "#007AFF", fontSize: 18 }}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  // setup favorites and search filtering using the activeData
  const pageInfo = { route: `/guidelines/${activeData.id}`, name: activeData.title };
  const isFav = isFavorite(pageInfo.route);

  const filteredSections = activeData.sections.filter((section) => {
    if (searchQuery.trim() === "") return true;
    const lowerCaseQuery = searchQuery.toLowerCase();
    const matchesHeading = section.heading.toLowerCase().includes(lowerCaseQuery);
    const matchesBody = section.body ? section.body.toLowerCase().includes(lowerCaseQuery) : false;
    const matchesBullets = section.bullets ? section.bullets.some(bullet => bullet.toLowerCase().includes(lowerCaseQuery)) : false;
    return matchesHeading || matchesBody || matchesBullets;
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </Pressable>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>{activeData.title}</Text>
        <Pressable onPress={() => toggleFavorite(pageInfo)}>
          <Ionicons name={isFav ? "star" : "star-outline"} size={32} color={isFav ? "#FFD700" : "#ccc"} />
        </Pressable>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchBar}
          placeholder="Search this guideline..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery} 
          clearButtonMode="while-editing" 
        />
      </View>
      
      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {filteredSections.length > 0 ? (
          filteredSections.map((section, index) => (
            <CollapsibleSection key={index} section={section} searchQuery={searchQuery} />
          ))
        ) : (
          <Text style={styles.noResultsText}>No sections match your search.</Text>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 60 },
  backButton: { position: "absolute", top: 50, left: 20, zIndex: 10, padding: 8 },
  backArrow: { fontSize: 28, fontWeight: "bold", color: "#007AFF" },
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 15, gap: 10, paddingHorizontal: 40 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: 'center' },
  highlightedText: { fontWeight: 'bold', backgroundColor: '#fff3cd', color: '#000' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f2f2f2', marginHorizontal: 20, marginBottom: 15, borderRadius: 10, paddingHorizontal: 10, height: 45 },
  searchIcon: { marginRight: 8 },
  searchBar: { flex: 1, fontSize: 16, color: '#333', height: '100%' },
  noResultsText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666', fontStyle: 'italic' },
  scrollArea: { flex: 1, paddingHorizontal: 20 },
  sectionContainer: { marginBottom: 10 },
  sectionBanner: { backgroundColor: "#9a96c7", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionBannerText: { color: "#fff", fontSize: 18, fontWeight: "bold", flex: 1 },
  contentArea: { paddingHorizontal: 5, paddingTop: 5, paddingBottom: 15 },
  bodyText: { fontSize: 16, color: "#333", lineHeight: 24, marginTop: 10 },
  bulletContainer: { marginTop: 10 },
  bulletRow: { flexDirection: 'row', marginBottom: 10 },
  bulletPoint: { fontSize: 18, color: "#333", marginRight: 10, marginTop: -2 },
  bulletText: { fontSize: 16, color: "#333", lineHeight: 24, flex: 1 }
});