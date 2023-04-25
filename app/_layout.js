import { Stack } from 'expo-router';
import { Provider } from '../context/auth';
import { StatusBar } from 'expo-status-bar';

const Layout = () => {
    return(
        <Provider>
            <StatusBar style='light' />
            <Stack screenOptions={{ headerTransparent: true, title: '' }} />
        </Provider>
    )
};

export default Layout;