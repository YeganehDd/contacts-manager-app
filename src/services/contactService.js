import axios from 'axios';

const SERVER_URL = "http://localhost:9000";
// const SERVER_URL = "https://contactsapi.ghorbani.dev";


//Get All contacts
//route: GET https://localhost:9000/contacts
export const  getAllContacts = () =>{
  const url = `${SERVER_URL}/contacts`;
  return axios.get(url);
}
//Get one contact with contactID
//route: GET https://localhost:9000/contacts/:contactId
export const getContact =(contactId)=>{
  const url = `${SERVER_URL}/contacts/${contactId}`;
  return axios.get(url);
}
//Get All groups
//route: GET https://localhost:9000/groups
export const getAllGroups = () =>{
    const url = `${SERVER_URL}/groups`;
    return axios.get(url);
}
//Get one group wth groupID
//route: GET https://localhost:9000/groups/:groupId
export const getGroup=(groupId)=>{
   const url =`${SERVER_URL}/groups/${groupId}`;
   return axios.get(url);
}

//Create New contact
//route: POST https://localhost:9000/contacts
export const createContact=(contact)=>{
    const url = `${SERVER_URL}/contacts`;
    return axios.post(url,contact);
}

//Update Contact
//route: PUT https://localhost:9000/contacts/contactId
export const updateContact =(contact , contactId)=>{
   const url=`${SERVER_URL}/contacts/${contactId}`;
   return axios.put(url , contact)
}

//delete Contact
//route: DELETE https://localhost:9000/contacts/contactId
export const deleteContact =(contactId) =>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url);
}