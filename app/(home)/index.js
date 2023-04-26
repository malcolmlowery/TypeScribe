import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useWindowDimensions } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useRouter } from 'expo-router';

const Index = () => {
    const router = useRouter();
    const headerHeight = useHeaderHeight();
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    
    return(
        <>
            <LinearGradient colors={['#2C2B4E', '#1F2130', '#191A23']} style={{ position: 'absolute', height: screenHeight, width: screenWidth }} />

            <Container style={{ paddingTop: headerHeight }}>
                <ScrollView showsVerticalScrollIndicator={false} contentInset={{ bottom: 100 }}>
                    <Greeting>
                        <Text style={{ fontSize: 16, opacity: 0.4 }}>Hi Zack Lee,</Text>
                        <Text style={{ fontSize: 19, fontWeight: '700', marginTop: 12 }}>Let's see what can I do for you?</Text>
                    </Greeting>

                    <HelpSection>
                        <HelpSectionLeftSide>
                            <Card>
                                <CardBackground source={{ uri: '/Users/malcolmlowery/Documents/expo-router-practice/assets/backgrounds/abstract-bg-01.png' }} />
                                <Text style={{ fontSize: 11, opacity: 0.5, marginBottom: 16 }}>Voice helper</Text>
                                <LightGrayIcon>
                                    <Ionicons color='#fff' name='ios-mic' size={25} style={{ left: 1 }} />
                                </LightGrayIcon>
                                <Spacer />
                                <Text style={{ fontSize: 19, fontWeight: '600', marginBottom: 25 }}>Let's find new things using voice recording</Text>
                                <WhiteButton>
                                    <Text style={{ color: '#000', fontSize: 14, fontWeight: '700' }}>Start Recording</Text>
                                </WhiteButton>
                            </Card>
                        </HelpSectionLeftSide>

                        <HelpSectionRightSide>
                            <TouchableOpacity onPress={() => router.push('/chat')}>
                                <Card>
                                    <GrayIcon>
                                        <Ionicons color='#fff' name='md-chatbox-ellipses' size={20} />
                                    </GrayIcon>
                                    <Spacer />
                                    <CardFooter>
                                        <Text style={{ fontSize: 15, lineHeight: 22, width: 100 }}>Start New Chat</Text>
                                        <Ionicons color='#fff' name='arrow-forward' size={25} style={{ flex: 1, position: 'absolute', right: 0, bottom: 0 }} />
                                    </CardFooter>
                                </Card>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Card>
                                    <GrayIcon>
                                        <Ionicons color='#fff' name='image' size={20} />
                                    </GrayIcon>
                                    <Spacer />
                                    <CardFooter>
                                        <Text style={{ fontSize: 15, lineHeight: 22, width: 100 }}>Search by image</Text>
                                        <Ionicons color='#fff' name='arrow-forward' size={25} style={{ flex: 1, position: 'absolute', right: 0, bottom: 0 }} />
                                    </CardFooter>
                                </Card>
                            </TouchableOpacity>
                        </HelpSectionRightSide>
                    </HelpSection>

                    <Text style={{ fontSize: 19, marginTop: 30, opacity: 0.4 }}>Recently Searched</Text>

                    <Card style={{ flexDirection: 'row', marginTop: 20 }}>
                        <LightGrayIcon style={{ position: 'relative', left: 0, top: 0, width: 30, height: 30, padding: 0 }}>
                            <Ionicons color='#fff' name='md-chatbox-ellipses' size={5} />
                        </LightGrayIcon>
                        <Text style={{ flex: 7, fontSize: 14, lineHeight: 19, marginHorizontal: 10  }}>Look for 5 potential headlines for websites with fintech names</Text>
                        <Ionicons color='#fff' name='arrow-forward' size={25} style={{ flex: 1, alignSelf: 'center' }} />
                    </Card>

                    <Card style={{ flexDirection: 'row', marginTop: 20 }}>
                        <LightGrayIcon style={{ position: 'relative', left: 0, top: 0, width: 30, height: 30, padding: 0 }}>
                            <Ionicons color='#fff' name='md-chatbox-ellipses' size={5} />
                        </LightGrayIcon>
                        <Text style={{ flex: 7, fontSize: 14, lineHeight: 19, marginHorizontal: 10  }}>Look for 5 potential headlines for websites with fintech names</Text>
                        <Ionicons color='#fff' name='arrow-forward' size={25} style={{ flex: 1, alignSelf: 'center' }} />
                    </Card>

                    <Card style={{ flexDirection: 'row', marginTop: 20 }}>
                        <LightGrayIcon style={{ position: 'relative', left: 0, top: 0, width: 30, height: 30, padding: 0 }}>
                            <Ionicons color='#fff' name='md-chatbox-ellipses' size={5} />
                        </LightGrayIcon>
                        <Text style={{ flex: 7, fontSize: 14, lineHeight: 19, marginHorizontal: 10  }}>Look for 5 potential headlines for websites with fintech names</Text>
                        <Ionicons color='#fff' name='arrow-forward' size={25} style={{ flex: 1, alignSelf: 'center' }} />
                    </Card>

                    <Card style={{ flexDirection: 'row', marginTop: 20 }}>
                        <LightGrayIcon style={{ position: 'relative', left: 0, top: 0, width: 30, height: 30, padding: 0 }}>
                            <Ionicons color='#fff' name='md-chatbox-ellipses' size={5} />
                        </LightGrayIcon>
                        <Text style={{ flex: 7, fontSize: 14, lineHeight: 19, marginHorizontal: 10  }}>Look for 5 potential headlines for websites with fintech names</Text>
                        <Ionicons color='#fff' name='arrow-forward' size={25} style={{ flex: 1, alignSelf: 'center' }} />
                    </Card>
                </ScrollView>
            </Container>

            <BlurView intensity={40} tint='dark' style={{ height: headerHeight, position: 'absolute', width: screenWidth, zIndex: 1000 }} />
            <BlurView intensity={40} tint='dark' style={{ height: 30, position: 'absolute', bottom: 0, width: screenWidth, zIndex: 1000 }} />
        </>
    )
};

export default Index;

const Container = styled.View`
    flex: 1;
    margin: 0 26px;
    overflow: visible;
`;

const ScrollView = styled.ScrollView`
overflow: visible;
`;

const Greeting = styled.View`
    margin-top: 30px;
`;

const HelpSection = styled.View`
    flex-direction: row;
    height: 300px;
    margin-top: 30px;
`;

const HelpSectionLeftSide = styled.View`
    flex: 1.2;
    margin-right: 10px;
`;

const HelpSectionRightSide = styled.View`
    flex: 1;
    gap: 10px;
`;

const Card = styled.View`
    background-color: rgba(90, 90, 90, 0.15);
    border-radius: 20px;
    border-color: #42424B;
    border-style: solid;
    border-width: 1px;
    flex: 1;
    padding: 16px;
    position: relative;
`;

const CardFooter = styled.View`
    flex-direction: row;
    position: relative;
`;

const CardBackground = styled.Image`
    border-radius: 18px;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    top: 0;
`;

const GrayIcon = styled.View`
    align-items: center;
    background-color: rgba(90, 90, 90, 0.85);
    border-radius: 40px;
    border-color: #61626B;
    border-style: solid;
    border-width: 1px;
    justify-content: center;
    left: 14px;
    padding: 10px;
    position: absolute;
    top: 12px;
`;

const LightGrayIcon = styled.View`
    align-items: center;
    background-color: rgba(180, 180, 180, 0.31);
    border-radius: 40px;
    border-color: rgba(170, 170, 170, 0.2);
    border-style: solid;
    border-width: 1px;
    height: 50px;
    justify-content: center;
    padding: 10px;
    width: 50px;
`;

const WhiteButton = styled.TouchableOpacity`
    align-items: center;
    background-color: #fff;
    border-radius: 50px;
    justify-content: center;
    padding: 12px;
`;

const Text = styled.Text`
    color: #fff;
    font-weight: 500;
`;

const Spacer = styled.View`
    flex: 1;
`;

const TouchableOpacity = styled.TouchableOpacity`
    flex: 1;
`;