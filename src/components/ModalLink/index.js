import React from 'react';
import { Text, TouchableOpacity, View, TouchableWithoutFeedback, Share } from 'react-native';
import { ModalContainer, Container, Header, LinkArea, Title, LongUrl, ShortLinkArea, ShortLinkUrl } from './styles';
import { Feather } from '@expo/vector-icons';
import Clipboard from 'expo-clipboard';
import { WebView } from 'react-native-webview';
import { useState } from 'react/cjs/react.development';
import { set } from 'react-native-reanimated';


export default function ModalLink({ onClose, data }) {


    const [newJanela, setNewJanela] = useState(false);

    function copyLink() {
        Clipboard.setString(data.link);
        alert('Link copiado com sucesso!');
    }

    async function handleShare() {
        try {
            const result = await Share.share({
                message: `Link: ${data.link}`
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('activeType')
                } else {
                    console.log('compartilhado com sucesso')
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('modal fechado')
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    if (newJanela == false) {
        return (
            <ModalContainer>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={{ flex: 1 }}></View>
                </TouchableWithoutFeedback>
                <Container>
                    <Header>
                        <TouchableOpacity onPress={onClose}>
                            <Feather name="x" color="#212743" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setNewJanela(true)}>
                            <Feather name="navigation" color="#212743" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleShare}>
                            <Feather name="share" color="#212743" size={30} />
                        </TouchableOpacity>
                    </Header>
                    <LinkArea>
                        <Title>Link encurtado</Title>
                        <LongUrl numberOfLines={1}>{data.long_url}</LongUrl>
                        <ShortLinkArea
                            activeOpacity={1}
                            onPress={copyLink}
                        >
                            <ShortLinkUrl numberOfLines={1}>{data.link}</ShortLinkUrl>
                            <TouchableOpacity onPress={copyLink}>
                                <Feather name="copy" color="#FFF" size={25} />
                            </TouchableOpacity>
                        </ShortLinkArea>
                    </LinkArea>
                </Container>
            </ModalContainer>
        )
    } else {
        return (< WebView source={{ uri: data.link }} />)
    }
}