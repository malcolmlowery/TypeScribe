import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useWindowDimensions } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useRouter } from 'expo-router';

const Chat = () => {
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const headerHeight = useHeaderHeight();

    return(
        <>
            <LinearGradient colors={['#2C2B4E', '#1F2130', '#191A23']} style={{ position: 'absolute', height: screenHeight, width: screenWidth }} />
            
            <Container style={{ top: headerHeight + 30 }}>
                <LinearGradient colors={['#D3D5DC', '#F1F5F8', '#F0F4F7']} style={{ position: 'absolute', height: screenHeight, width: screenWidth }} />
                <ScrollView>
                    <Question>
                        <ProfileImage source={{ uri: 'https://malcolmlowery.github.io/assets/profile-images/5EBF628C-D935-4F3F-B341-173E59E7E6CC.jpg' }} />
                        <LinearGradient colors={['#333439', '#191A23']} start={[0,0]} end={[1,0]} style={{ borderRadius: 20, borderTopRightRadius: 0, flex: 1, padding: 20 }}>
                            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 15, lineHeight: 20 }}>What is digital abstract design and find 3 examples of abstract design</Text>
                            <Options>
                                <OptionItem>
                                    <Ionicons color='#fff' name='create-outline' size={15} />
                                    <Text style={{ color: '#fff', marginLeft: 6 }}>Edit</Text>
                                </OptionItem>
                                <OptionItem>
                                    <Ionicons color='#fff' name='copy-outline' size={15} />
                                    <Text style={{ color: '#fff', marginLeft: 6 }}>Copy</Text>
                                </OptionItem>
                            </Options>
                        </LinearGradient>
                    </Question>

                    <Answer>
                        <Text style={{ color: '#000', fontWeight: '400', fontSize: 15, lineHeight: 22 }}>
                            Digital abstract design refers to artwork or design that does not represent recognizable 
                            objects from the physical world, but rather focuses on using shapes, colors, patterns, and 
                            textures to create a visually appealing and often unconventional composition. It is often 
                            characterized by its non-representational and non-literal nature, allowing for creative 
                            freedom and experimentation.
                        </Text>
                        <OptionItem style={{ alignSelf: 'flex-end', marginRight: 0 }}>
                            <Ionicons color='#000' name='copy-outline' size={15} />
                            <Text style={{ color: '#000', marginLeft: 6 }}>Copy</Text>
                        </OptionItem>
                    </Answer>
                </ScrollView>
            </Container>
        </>
    )
};

export default Chat;

const Container = styled.View`
    align-items: center;
    background-color: #fff;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    flex: 1;
    justify-content: center;
    overflow: hidden;
`;

const ScrollView = styled.ScrollView`
    flex: 1;
    padding: 20px;
    width: 100%;
`;

const Question = styled.View`
    flex-direction: row-reverse;
`;

const ProfileImage = styled.Image`
    border-radius: 20px;
    height: 40px;
    margin-left: 10px;
    width: 40px;
`;

const Options = styled.View`
    flex-direction: row;
    margin-top: 10px;
`;

const OptionItem = styled.View`
    flex-direction: row;
    margin-right: 20px;
    opacity: 0.4;
`;

const Answer = styled.View`
    background-color: #fff;
    border-radius: 20px;
    margin-top: 15px;
    padding: 20px;
`;

const Text = styled.Text``;

const TouchableOpacity = styled.TouchableOpacity``;