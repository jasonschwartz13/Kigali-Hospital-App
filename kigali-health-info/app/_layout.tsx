import { Stack } from 'expo-router';
import { FavoritesProvider } from './context/FavoritesContext';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      {/* Adding screenOptions here kills the default header globally */}
      <Stack screenOptions={{ headerShown: false }}>
        
        {/* You can list specific screens if you want, but Stack will automatically 
            find your files even if you don't list them all here! */}
        <Stack.Screen name="index" />
        <Stack.Screen name="all-guidelines" />
        <Stack.Screen name="favorites" />
        
      </Stack>
    </FavoritesProvider>
  );
}