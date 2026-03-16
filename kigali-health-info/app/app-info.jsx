import { View, Text, Pressable, StyleSheet, ScrollView, Dimensions, Linking } from "react-native";
import { router } from "expo-router";

// Get screen width for easier grid calculations
const { width } = Dimensions.get('window');
const CARD_MARGIN = 10;
const COLUMN_WIDTH = (width - 40 - CARD_MARGIN) / 2; // (TotalWidth - ContainerPadding - GapBetweenCards) / 2

export default function AppInfoScreen() {
  return (
    <View style={styles.mainContainer}>
      
      {/* Absolute Back Button */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </Pressable>

      {/* 1. Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTextGroup}>
          <Text style={styles.title}>Application Information</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        
        {/* 2. Top Grid Section (Using Flexbox to mimic grid) */}
        <View style={styles.gridContainer}>

          {/* Developer Card 1*/}
          <View style={[styles.cardBase, styles.devCard]}>
            <View style={styles.devTextContainer}>
                <Text style={styles.cardHeaderWhite}>Zaynab Almothafer MD, MBS</Text>
                <Text style={styles.cardTextLight}>UW Health Dept of Medicine{"\n"}</Text>
                <Text style={styles.cardHeaderWhite}>Contact</Text>
                <Text style={styles.cardTextLight}>almothafer@wisc.edu</Text>
            </View>
          </View>

          {/* Developer Card 2*/}
          <View style={[styles.cardBase, styles.devCard]}>
            <View style={styles.devTextContainer}>
                <Text style={styles.cardHeaderWhite}>Jason Schwartz</Text>
                <Text style={styles.cardTextLight}>B.S. Computer Science and Data Science, University of Wisconsin-Madison {"\n"}</Text>
                <Text style={styles.cardTextLight}>M.S. Industrial & Operations Engineering, University of Michigan {"\n"}</Text>
                <Text style={styles.cardHeaderWhite}>Contact</Text>
                <Text style={styles.cardTextLight}>jasonschwartz2004@gmail.com</Text>
            </View>
          </View>

        </View>

        {/* 3. Bottom Full Width "About" Card */}
        <View style={[styles.cardBase, styles.aboutCard]}>
          <View style={styles.flexRow}>
            <View style={styles.aboutTextGroup}>
              <Text style={styles.cardHeaderWhite}>About</Text>
              <Text style={styles.cardTextLight}>This app provides up-to-date Antimicrobial Guidelines for common medical concerns in Kigali Rwanda.{"\n"}</Text>

              <Pressable onPress={() => Linking.openURL('https://kfh.rw/')}>
                <Text style={{ color: '#82B1FF', fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }}>
                Visit KFH Website
                </Text>
              </Pressable>


            </View>
          </View>
          <View style={[styles.bottomLine, { backgroundColor: '#F0E6EF' }]} />
        </View>

        {/* Extra space at bottom */}
        <View style={{ height: 40 }} />
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF8F0', // Warm cream/peach background matching screenshot
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
    color: "#4A4E69",
  },
  // Header
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A4E69',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 3,
  },
  // Scroll Area
  scrollArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Makes cards wrap to next line
    gap: CARD_MARGIN,
    marginTop: 20,
  },
  // Card base styles
  cardBase: {
    borderRadius: 20,
    padding: 15,
    overflow: 'hidden', // Ensures bottom lines respect border radius
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bottomLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  // Specific Card Styles
  appVersionCard: {
    width: COLUMN_WIDTH,
    height: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  emptyGrayCard: {
    width: COLUMN_WIDTH,
    height: 100,
    backgroundColor: '#EAEAEA',
  },
  devCard: {
    width: '100%', // This forces the card to take up the full row, stacking them
    backgroundColor: '#353A56', 
    flexDirection: 'row', // Puts the avatar and text side-by-side
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  devTextContainer: {
    marginLeft: 15, // Creates space between the avatar and the text
    flex: 1, // Allows text to wrap if it gets too long
  },
  aboutCard: {
    width: '100%',
    height: 220, // Tall card based on screenshot
    backgroundColor: '#9A8C98', // Muted purple
    marginTop: 10,
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  // Text Styles
  largeA: {
    fontSize: 60,
    color: '#353A56',
    fontWeight: '300',
    fontFamily: 'System', // Standard system font
  },
  cardHeaderSmall: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  cardTextTiny: {
    fontSize: 11,
    color: '#888',
  },
  cardHeaderWhite: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E0E1DD',
    textAlign: 'center',
  },
  cardTextContact: {
    fontSize: 12,
    color: '#E0E1DD',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  aboutTextGroup: {
    flex: 1,
  },
  cardTextLight: {
    fontSize: 18,
    color: '#E0E1DD',
    marginTop: 2,
  },
  circlePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)', // Slightly see-through white
  },
  rationaleLabel: {
    color: '#F0E6EF',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 15,
  },
  cardTextLong: {
    color: '#E0E1DD',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },
});