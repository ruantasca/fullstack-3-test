import { Stack } from 'expo-router'
import { LoginProvider } from '../scripts/LoginContext'

export default function Layout() {
    return (
        <LoginProvider>
            <Stack screenOptions={{
                headerStyle: {
                    backgroundColor: '#1d0073'
                },
                headerTintColor: 'white'
            }}>
                <Stack.Screen name='index' options={{ headerTitle: 'Home' }} />
                <Stack.Screen name='Pagamento' options={{ headerTitle: 'Pagamento' }} />
                <Stack.Screen name='Registro' options={{ headerTitle: 'Registro' }} />
                <Stack.Screen name='Login' options={{ headerTitle: 'Login' }} />
                <Stack.Screen name='Perfil' options={{ headerTitle: 'Perfil' }} />
                <Stack.Screen name='Admin' options={{ headerTitle: 'AdmHome' }} />
                <Stack.Screen name='Home' options={{ headerTitle: 'Home' }} />
            </Stack>
        </LoginProvider>
    )
}