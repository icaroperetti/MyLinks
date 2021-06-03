import React,{useState,useEffect} from 'react';
import {Modal,ActivityIndicator} from 'react-native';

import {useIsFocused} from '@react-navigation/native';

import Menu from '../../components/Menu';
import StatusBarPage from '../../components/StatusBarPage';
import ListItem from '../../components/ListItem';
import ModalLink from '../../components/ModalLink';

import {getLinksSave,deleteLink} from '../../utils/storeLinks';

import {Container,Title,ListLinks,ContainerEmpty,WarningText} from './styles';


export default function MyLinks(){
    const isFocused = useIsFocused();

    const [links,setLinks] = useState([]);
    const [data,setData] = useState({});
    const [modalVisible,setModalVisible] = useState(false);
    const [loading,setLoading] = useState(true);


    useEffect(() => {
        async function getLinks(){
            const result = await getLinksSave('links');
            setLinks(result);
            setLoading(false);
        }
        getLinks();
    }, [isFocused])

    function handleItem(item){
       setData(item);
       setModalVisible(true);
    }

    async function handleDelete(id){
        const result = await deleteLink(links,id);
        setLinks(result);
    }

    return(
        <Container>
            <StatusBarPage 
            barStyle="light-content"
            backgroundColor="#132742"
            />

            <Menu/>

            {
                loading && (
                    <ContainerEmpty>
                       <ActivityIndicator 
                        color="#FFF"
                        size={25}
                       />
                    </ContainerEmpty>
                )
            }

            <Title>Meus Links</Title>
            {
               !loading && links.length === 0 && (
                    <ContainerEmpty>
                        <WarningText>Ainda não existem links</WarningText>
                    </ContainerEmpty>
                )
            }
            <ListLinks
                data={links}
                keyExtractor={( item ) => String(item.id)}
                renderItem={({item }) => <ListItem  data={item } selectedItem={handleItem} deleteItem={handleDelete}/>}
                contentContainerStyle={{paddingBottom:22}}
                showsVerticalScrollIndicator={false}
            />

        <Modal visible={modalVisible} transparent animationType="slide">
            <ModalLink onClose={() => setModalVisible(false)} data={data} />
        </Modal>
        </Container>
    )
}