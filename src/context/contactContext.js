import {createContext} from "react";
import contact from "../Components/Contacts/Contact";

export const ContactContext = createContext({
    loading: false ,
    setLoading : () =>{},
    // contact: {},
    //setContact:()=>{},
    setContacts:()=>{},
    contacts: [],
    //for yup
    // errors:[],
    //
    filteredContacts:[],
    setFilteredContacts:[],
    // contactQuery:{},
    groups: [],
    // onContactChange:()=>{},
    deleteContact:()=>{},
    //updateContact:()=>{},
    createContact:()=>{},
    contactSearch:()=>{}
});