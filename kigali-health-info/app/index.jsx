import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>Antimicrobial Guidelines</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search guidelines..."
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>

        <Pressable style={styles.button} onPress={() => router.push("/favorites")}>
          <Text style={styles.buttonText}>Favorites</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push("/all-guidelines")}>
          <Text style={styles.buttonText}>All Guidelines</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Antibiogram</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push("/app-info")}>
          <Text style={styles.buttonText}>App Info</Text>
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  searchBar: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 30,
  },

  buttonContainer: {
    width: "100%",
    gap: 15,
  },

  button: {
    backgroundColor: "#2c7be5",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

});