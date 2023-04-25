import styled from 'styled-components/native';
import { useRouter, useNavigation, Stack, usePathname } from 'expo-router';
import { useEffect } from 'react';

const hamburger_icon_01 = '/Users/malcolmlowery/Documents/expo-router-practice/assets/icons/hamburger-icon-01.png';
const hex_icon_01 = '/Users/malcolmlowery/Documents/expo-router-practice/assets/icons/hex-icon-01.png';
const arrow_back_icon_01 = '/Users/malcolmlowery/Desktop/TypeScribe/assets/icons/arrow-back-01.png';
const three_dot_horizontal_icon_01 = '/Users/malcolmlowery/Desktop/TypeScribe/assets/icons/three-horizontal-dot-icon-01.png';

const Layout = () => {
    const pathname = usePathname();
    const router = useRouter();
    const navigation = useNavigation();

    const handleOnPress = () => {
        if(pathname === '/chat') {
            router.back()
        }
    };


    useEffect(() => {
        navigation.setOptions({
            header: () => {
                return(
                    <Header>
                        <TouchableOpacity onPress={() => handleOnPress()}>
                            <HeaderIcon source={{ uri: pathname === '/' ? hamburger_icon_01 : arrow_back_icon_01 }} />
                        </TouchableOpacity>
                        { pathname === '/chat' && <Text>Ai Wave</Text> }
                        <TouchableOpacity>
                            <HeaderIcon source={{ uri:  pathname === '/' ? hex_icon_01 : three_dot_horizontal_icon_01 }} />
                        </TouchableOpacity>
                    </Header>
                )
            }
        })
    }, [pathname]);

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

const Text = styled.Text`
    color: #fff;
    font-weight: 600;
    top: -15px;
`;

const TouchableOpacity = styled.TouchableOpacity``;