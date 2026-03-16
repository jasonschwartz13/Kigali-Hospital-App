import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useFavorites } from "./context/FavoritesContext";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </Pressable>

      <Text style={styles.title}>Favorites</Text>

      {/* Loop through our favorites and create a button for each */}
      <View style={styles.buttonContainer}>
        {favorites.length === 0 ? (
          <Text style={styles.emptyText}>No favorites added yet.</Text>
        ) : (
          favorites.map((item) => (
            <Pressable 
              key={item.route} 
              style={styles.button} 
              onPress={() => router.push(item.route)}
            >
              <Text style={styles.buttonText}>{item.name}</Text>
            </Pressable>
          ))
        )}
      </View>
    </View>
  );
}

// Use the exact same styles you used in all-guidelines.tsx here
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 70, paddingHorizontal: 20 },
  backButton: { position: "absolute", top: 60, left: 20, zIndex: 10, padding: 8 },
  backArrow: { fontSize: 28, fontWeight: "bold" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 40 },
  buttonContainer: { gap: 15, marginTop: 20 },
  button: { backgroundColor: "#2c7be5", paddingVertical: 16, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  emptyText: { textAlign: 'center', color: '#666', fontSize: 16, marginTop: 20 }
});