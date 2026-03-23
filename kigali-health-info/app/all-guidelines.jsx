import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function AllGuidelinesScreen() {
  return (
    <View style={styles.container}>
      {/* Back arrow */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </Pressable>

      {/* Page title */}
      <Text style={styles.title}>All Guidelines</Text>

      {/* Guideline buttons */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => router.push("/guidelines/community-acquired-pneumonia")}>
          <Text style={styles.buttonText}>Community-Acquired Pneumonia</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push("/guidelines/sepsis")}>
          <Text style={styles.buttonText}>Sepsis of Unclear Etiology</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push("/guidelines/surgical-prophylaxis")}>
          <Text style={styles.buttonText}>Surgical Prophylaxis</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push("/guidelines/meningitis")}>
          <Text style={styles.buttonText}>Meningitis</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push("/guidelines/uti")}>
          <Text style={styles.buttonText}>UTI (Adult)</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push("/guidelines/uti-child")}>
          <Text style={styles.buttonText}>UTI (Child)</Text>
        </Pressable>
      </View>
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
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonContainer: {
    gap: 15,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#2c7be5",
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});