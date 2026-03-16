import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function SepsisScreen() {
  return (
    <View style={styles.container}>
      {/* Back arrow */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </Pressable>

      {/* Change this text for each file! */}
      <Text style={styles.title}>Disease Name Here</Text>
      
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
    alignItems: "center",
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
    color: "#007AFF", // Added a bit of color to make it look clickable
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  }
});