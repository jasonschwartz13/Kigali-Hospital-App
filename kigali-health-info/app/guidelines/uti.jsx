import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons'; // Import the icon library
import { useFavorites } from "../context/FavoritesContext"; // Import our bucket

export default function UTIScreen() {
  // Pull our functions out of the global context
  const { toggleFavorite, isFavorite } = useFavorites();
  
  // Define the info for this specific page
  const pageInfo = { route: "/guidelines/uti", name: "UTI" };
  
  // Check if this specific page is currently a favorite
  const isFav = isFavorite(pageInfo.route);

  return (
    <View style={styles.container}>
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
            color={isFav ? "#FFD700" : "#ccc"} // Gold if active, gray if not
          />
        </Pressable>
      </View>
      
      <Text style={styles.subtitle}>Guideline content coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 60,
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
    flexDirection: 'row', // Puts the title and star side-by-side
    alignItems: 'center', // Centers them vertically
    justifyContent: 'center', // Centers them horizontally
    marginTop: 40,
    marginBottom: 10,
    gap: 10, // Space between title and star
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center"
  }
});