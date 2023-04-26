import 'react-native-url-polyfill/auto'
import styled from 'styled-components/native';
import EventSource from 'react-native-sse';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useWindowDimensions, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useEffect, useState, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { OPENAI_API_KEY } from '@env';

const Chat = () => {
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const headerHeight = useHeaderHeight();
    const flatlist_ref = useRef();
    const loading_lottie_ref = useRef(null)
    const [keyboardData, setKeyboardData] = useState({ keyboardActive: false, keyboardHeight: 0 });
    const [componentHeight, setComponentHeight] = useState(0);
    const [text, setText] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isFetchingResponse, setIsFetchingResponse] = useState(false);

    const handleSubmitQuestion = async () => {
        if(text === '' || text === undefined) {
            return alert('Please ask a valid question.')
        }

        setConversation(prevState => ([ ...prevState, { id: Math.random(), question: text }]))

      try {
        setText('')
        setIsFetchingResponse(true)
        const message_id = Math.random()

        const data = {
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: text }],
            temperature: 0.75,
            top_p: 0.95,
            max_tokens: 100,
            stream: true,
            n: 1,
            max_tokens: 800,
          };
        
        const es = new EventSource('https://api.openai.com/v1/chat/completions', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}`
            },
            method: 'POST',
            body: JSON.stringify(data),
            pollingInterval: 2500
        });

        setConversation(prevState => [...prevState, { message_id }])
    
        const listener = (event) => {
            if(event.type === 'open') {
    
            } else if(event.type === 'message') {
                if(event.data !== '[DONE]') {
                    const data = JSON.parse(event.data)
                    const delta = data.choices[0].delta
    
                    const finish_reason = data.choices[0].finish_reason
                    
                    if(finish_reason === 'stop') {
                        es.close()
                    } else {
                        if(delta && delta.content) {
                            setConversation(prevState => {
                                const updatedConversationArray = prevState.map(convo => {
                                    if(convo.message_id === message_id) {
                                        return({ ...convo, answer: convo.answer !== undefined ? convo.answer + delta.content : delta.content})
                                    } else {
                                        return convo
                                    }
                                })

                                return updatedConversationArray
                            })
                        }
                    }
    
                } else {
                    es.close()
                    setIsFetchingResponse(false)
                }
            } else if(event.type === 'error') {
                setIsFetchingResponse(false)
                console.log('Connection Error:', event.message)
            } else if(event.type === 'exception') {
                setIsFetchingResponse(false)
                console.log('Error:', event.message, event.error)
            } 
        };
    
        es.addEventListener('open', listener)
        es.addEventListener('message', listener)
        es.addEventListener('error', listener)
    
        return () => {
            es.removeEventListener()
            es.close()
        }

      } catch(error) {
            console.log(error)
            setIsFetchingResponse(false)
      }
    };

    useEffect(() => {

        const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (listener) => {
            setKeyboardData({ keyboardActive: true, keyboardHeight: listener.endCoordinates.height })
        })
        const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
            setKeyboardData({ keyboardActive: false, keyboardHeight: 0 })
        })

        return () => {false
            keyboardWillShowListener.remove()
            keyboardWillHideListener.remove()
        }

    }, [keyboardData])

    return(
        <>
            <BackgroundContainer>
                <BlurView intensity={100} tint='dark' style={{ flex: 1, position: 'absolute', height: screenHeight, opacity: 0.9, width: screenWidth, zIndex: 101 }} />
                <BackgroundImage source={{ uri: '/Users/malcolmlowery/Desktop/TypeScribe/assets/backgrounds/grid_0.png' }} />
            </BackgroundContainer>
            
            <Container style={{ top: headerHeight + 20 }}>
                <LinearGradient colors={['#D3D5DC', '#F1F5F8', '#F0F4F7']} style={{ position: 'absolute', height: screenHeight, width: screenWidth, opacity: 0.7 }} />
                <FlatList 
                    ref={flatlist_ref}
                    data={[...conversation]}
                    contentInset={{ bottom: 350 }}
                    showsVerticalScrollIndicator={false}
                    getItemLayout={(item, index) => ({ length: componentHeight, offset: componentHeight * index * 2.9, index: index })}
                    renderItem={({ item, index }) => {
                        flatlist_ref?.current?.scrollToIndex({ index: conversation.length - 1 })
                        return(
                            <>
                                {item.question &&
                                    <Question onLayout={(event) => setComponentHeight(event.nativeEvent.layout.height)} style={{ marginTop: index > 1 && 14, top: 3 }}>
                                        <ProfileImage source={{ uri: 'https://malcolmlowery.github.io/assets/profile-images/5EBF628C-D935-4F3F-B341-173E59E7E6CC.jpg' }} />
                                        <LinearGradient colors={['#333439', '#191A23']} start={[0,0]} end={[1,0]} style={{ borderRadius: 20, borderTopRightRadius: 0, flex: 1, padding: 20 }}>
                                            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 15, lineHeight: 20 }}>{item.question}</Text>
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
                                }
                                { item.answer &&
                                    <Answer onLayout={(event) => setComponentHeight(event.nativeEvent.layout.height)}>
                                        <Text style={{ color: '#000', fontWeight: '400', fontSize: 15, lineHeight: 22 }}>
                                            {item.answer}
                                        </Text>
                                        <OptionItem style={{ alignSelf: 'flex-end', marginRight: 0, marginTop: 6 }}>
                                            <Ionicons color='#000' name='copy-outline' size={15} />
                                            <Text style={{ color: '#000', marginLeft: 6 }}>Copy</Text>
                                        </OptionItem>
                                    </Answer>
                                }
                            </>
                        )
                    }}
                    ListFooterComponent={() => {
                        return(
                            <>
                               { isFetchingResponse &&
                                    <LottieView
                                        loop
                                        onLayout={() => {loading_lottie_ref.current?.play()}}
                                        ref={loading_lottie_ref}
                                        style={{ alignSelf: 'center', height: 110, top: -6, width: 110 }}
                                        source={require('../../../assets/animations/loading-anime-01.json')}
                                    />
                               }
                            </>
                        )
                    }}
                />
            </Container>
            
            <KeyboardAvoidingView behavior='padding' enabled={true} style={{ position: 'absolute', width: screenWidth, bottom: 0}}>
                <SearchContainer style={{ bottom: !keyboardData.keyboardActive && 30 }}>
                    <BlurView intensity={100} style={{ alignItems: 'center', flex: 1, flexDirection: 'row', padding: 20, margin: 20, borderRadius: 20, overflow: 'hidden', width: screenWidth, zIndex: 999 }}>
                        <TextInput multiline={true} placeholder='Write anything here...' value={text} onChangeText={(value) => setText(value)} />
                        <MicrophoneButton onPress={() => handleSubmitQuestion()}>
                            <LinearGradient colors={['#8F86F1', '#71DCE1']} start={[0,0]} end={[1,0]} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Ionicons color='#fff' name='paper-plane' size={20} style={{ left: -2 }} />
                            </LinearGradient>
                        </MicrophoneButton>
                    </BlurView>
                </SearchContainer>
            </KeyboardAvoidingView>
        </>
    )
};

export default Chat;

const BackgroundContainer = styled.View`
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
`;

const BackgroundImage = styled.Image`
    flex: 1;
    position: relative;
    z-index: 100;
`;

const Container = styled.View`
    align-items: center;
    border-top-right-radius: 40px;
    border-top-left-radius: 40px;
    flex: 1;
    justify-content: center;
    overflow: hidden;
`;

const FlatList = styled.FlatList`
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

const SearchContainer = styled.View`
    align-items: center;
    flex-direction: row;
    box-shadow: -4px 0 80px rgba(0,0,0,0.1);
`;

const TextInput = styled.TextInput`
    background-color: #fff;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 500;
    flex: 1;
    margin-right: 10px;
    max-height: 200px;
    overflow: hidden;
    padding: 14px 20px;
    z-index: 1001;
`;

const MicrophoneButton = styled.TouchableOpacity`
    background-color: red;
    border-radius: 30px;
    height: 45px;
    overflow: hidden;
    width: 45px;
    z-index: 1001;
`;

const Text = styled.Text``;

const TouchableOpacity = styled.TouchableOpacity``;