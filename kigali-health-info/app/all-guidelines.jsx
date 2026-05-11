import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { guidelinesList } from "../data/index.js"; // import the master list

export default function AllGuidelinesScreen() {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </Pressable>

      <Text style={styles.title}>All Guidelines</Text>

      {/* Make this a ScrollView in case the doctors add many more guidelines */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.buttonContainer}>
        
        {/* THE DYNAMIC LOOP */}
        {guidelinesList.map((guideline) => (
          <Pressable 
            key={guideline.id} 
            style={styles.button} 
            // pass the guideline's ID into the URL path
            onPress={() => router.push(`/guidelines/${guideline.id}`)}
          >
            <Text style={styles.buttonText}>{guideline.title}</Text>
          </Pressable>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 70, paddingHorizontal: 20 },
  backButton: { position: "absolute", top: 60, left: 20, zIndex: 10, padding: 8 },
  backArrow: { fontSize: 28, fontWeight: "bold" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  buttonContainer: { gap: 15, paddingBottom: 20 },
  button: { backgroundColor: "#2c7be5", paddingVertical: 16, paddingHorizontal: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600", textAlign: "center" },
});