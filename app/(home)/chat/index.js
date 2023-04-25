import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

const Chat = () => {
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();

    return(
        <>
            <LinearGradient colors={['#2C2B4E', '#1F2130', '#191A23']} style={{ position: 'absolute', height: screenHeight, width: screenWidth }} />
            <Container>

            </Container>
        </>
    )
};

export default Chat;

const Container = styled.View`
    align-items: center;
    flex: 1;
    justify-content: center;
`;

const Text = styled.Text``;

const TouchableOpacity = styled.TouchableOpacity``;