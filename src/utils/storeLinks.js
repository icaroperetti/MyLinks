import  AsyncStorage from '@react-native-async-storage/async-storage';

//Buscar links salvos
export async function getLinksSave(key){
  const myLinks = await AsyncStorage.getItem(key);
  
  let linkSaves = JSON.parse(myLinks) || [];

  return linkSaves;
}

//Salvar link 
export async function saveLink(key,newLink){
  let linksStored = await getLinksSave(key);

  //Se for duplicado ignorar 
  const hasLink = linksStored.some(link => link.id == newLink.id);

  if(hasLink){
    console.log('Esse link ja existe');
    return;
  }

  linksStored.push(newLink);

  await AsyncStorage.setItem(key,JSON.stringify(linksStored));
  console.log('link salvo');
}

//Deletar link
export async function deleteLink(links,id){
  let myLinks = links.filter((item) => {
    return (item.id !== id);
  })
  await AsyncStorage.setItem('links',JSON.stringify(myLinks));
  console.log('link deletado do storage');

  return myLinks;
}