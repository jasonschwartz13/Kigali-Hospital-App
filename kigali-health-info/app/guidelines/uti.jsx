import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from "../context/FavoritesContext"; 

export default function UTIScreen() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const pageInfo = { route: "/guidelines/uti", name: "UTI" };
  const isFav = isFavorite(pageInfo.route);

  return (
    <View style={styles.container}>
      {/* Absolute Back Button */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </Pressable>

      {/* Header Container for Title and Star */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>UTI</Text>
        
        <Pressable onPress={() => toggleFavorite(pageInfo)}>
          <Ionicons 
            name={isFav ? "star" : "star-outline"} 
            size={32} 
            color={isFav ? "#FFD700" : "#ccc"} 
          />
        </Pressable>
      </View>
      
      {/* Scrollable Content Area */}
      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        
        {/* 1. Introduction Section */}
        <View style={styles.sectionBanner}>
          <Text style={styles.sectionBannerText}>Introduction</Text>
        </View>
        <Text style={styles.bodyText}>
          Placeholder text for the Introduction. This is where you will explain the background and clinical presentation of the disease.
        </Text>

        {/* 2. Purpose Section */}
        <View style={styles.sectionBanner}>
          <Text style={styles.sectionBannerText}>Purpose</Text>
        </View>
        <Text style={styles.bodyText}>
          Placeholder text for the Purpose. Define what this specific guideline is intended to achieve for the patient or hospital staff.
        </Text>

        {/* 3. Aim Section */}
        <View style={styles.sectionBanner}>
          <Text style={styles.sectionBannerText}>Aim</Text>
        </View>
        <Text style={styles.bodyText}>
          Placeholder text for the Aim. Detail the measurable goals, targets, and expected outcomes of the treatment plan.
        </Text>

        {/* 4. Rationale Section */}
        <View style={styles.sectionBanner}>
          <Text style={styles.sectionBannerText}>Rationale</Text>
        </View>
        <Text style={styles.bodyText}>
          Placeholder text for the Rationale. Explain the evidence-based reasoning, pharmacological choices, and clinical studies backing this guideline.
        </Text>

        {/* A little extra space at the bottom so the last line of text isn't glued to the bottom of the screen */}
        <View style={{ height: 40 }} />
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60, 
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  backArrow: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007AFF",
  },
  headerContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 10,
    marginBottom: 20,
    gap: 10, 
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 20, // Keeps the text from touching the absolute edges of the phone
  },
  sectionBanner: {
    backgroundColor: "#9a96c7", // The purple from your screenshot
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  sectionBannerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24, // Adds comfortable spacing between lines of text
    paddingHorizontal: 5,
    paddingVertical: 15,
  }
});