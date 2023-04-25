import styled from 'styled-components/native';
import { useRouter, useNavigation, Slot, Stack } from 'expo-router';
import { useEffect } from 'react';

const Layout = () => {
    const router = useRouter()
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            header: () => {
                return(
                    <Header>
                        <HeaderIcon source={{ uri: '/Users/malcolmlowery/Documents/expo-router-practice/assets/icons/hamburger-icon-01.png' }} />
                        <HeaderIcon source={{ uri: '/Users/malcolmlowery/Documents/expo-router-practice/assets/icons/hex-icon-01.png' }} />
                    </Header>
                )
            }
        })
    }, [])

    return <Stack screenOptions={{ headerShown: false }} />
};

export default Layout;

const Header = styled.View`
    align-items: flex-end;
    background: transparent;
    flex-direction: row;
    height: 150px;
    justify-content: space-between;
    margin: 0 26px;
    padding-bottom: 20px;
`;

const HeaderIcon = styled.Image`
    height: 50px;
    width: 50px;
`;