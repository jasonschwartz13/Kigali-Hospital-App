import { Stack } from 'expo-router';
import { FavoritesProvider } from './context/FavoritesContext';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="all-guidelines" options={{ headerShown: false }} />
      </Stack>
    </FavoritesProvider>
  );
}