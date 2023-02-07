// import logo from './logo.svg';
import { useEffect, useContext } from "react";
// import React from 'react';
import {Routes , Route  , Navigate,useNavigate} from "react-router-dom";

//import axios from 'axios';

//import alert for use in delete part
import { confirmAlert } from 'react-confirm-alert'; // Import

//immer in 105 Episode:
import {useImmer} from 'use-immer';
//react-toastify in 106 Episode
 import { ToastContainer , toast } from 'react-toastify';

//Episode107
// import toast , {Toaster} from 'react-hot-toast';
//

//use lodash library- in 100episode
import  _ from 'lodash';

//for  use context codes
import {ContactContext} from  './context/contactContext';

import {
    AddContact ,
    EditContact ,
    ViewContact,
//    Contact ,
    Contacts,
    Navbar
} from "./Components";
// import {SearchContact} from "./Components/Contacts";

import {
    getAllContacts,
    getAllGroups,
    createContact,
    deleteContact,
    //updateContact,
    //getContact,
} from './services/contactService';

import './App.css';
import {CurrentLine, Purple, Yellow, Comment, Foreground} from "./helpers/colors";

// ///for validation,we use yup: episode101
// import {contactSchema} from './validations/contactValidation';

const App = () => {
    const [loading , setLoading] = useImmer(false);
    //const [ forceRender , setForceRender] = useState(false);
    const [contacts , setContacts] = useImmer([]);
    const [filteredContacts , setFilteredContacts] = useImmer([]);
    const [groups , setGroups] = useImmer([]);
    // const [contact, setContact]=useState({});

    //for search contact
    // const[contactQuery , setContactQuery] = useState({text: ""});
    ///
    //create state for yep: episode101
    // const [errors , setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        //for learning strictmode in 10 season-episode97
          console.log("Contact Manager App");
       //////////////////////////////////////////////
        const fetchData = async()=>{
        try{
            setLoading(true);
            // const response = await axios.get("http://localhost:9000/contacts");
            // console.log(response);
            const {data : contactsData } = await getAllContacts();
            const{data: groupsData} = await getAllGroups();

            setContacts(contactsData);
            setFilteredContacts(contactsData);
            setGroups(groupsData);

            setLoading(false);
        }catch (err){
            console.log(err.message);
            setLoading(false);
         }
        };
        fetchData();
    },[])
    ////
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                setLoading(true);
                // const response = await axios.get("http://localhost:9000/contacts");
                // console.log(response);
                const {data : contactsData } = await getAllContacts();

                setContacts(contactsData);

                setLoading(false);
            }catch (err){
                console.log(err.message);
                setLoading(false);
            }
        }
        fetchData();
    },[]);

    /// Create form for add contact
    const createContactForm =async (values)=>{
      // event.preventDefault();
       try{
           //for immer
           setLoading(  draft => !draft);

           //for validation with yup
           // await contactSchema.validate(contact  , { abortEarly:false });
          //
           const{status,data} = await createContact(values);

           if(status === 201){
               // const allContacts = [...contacts , data];
               //
               // setContacts(allContacts);
               // setFilteredContacts(allContacts);
               //106-episode
               toast.success(" مخاطب با موفقیت ساخته شد. " , {icon : " "} );

               //for immer
               setContacts((draft) =>{
                   draft.push(data);
               } );
               setFilteredContacts((draft) =>{
                   draft.push(data);
               });

               // setContact({});
               //for yup
               // setErrors([]);
               //
               setLoading(  (prevLoading) => !prevLoading);
              //setForceRender(!forceRender);
               navigate("/contacts");
           }
       }catch (err){
           console.log(err.message);
           //
           // console.log(err.inner);
           // setErrors(err.inner);
           //
           setLoading(  (prevLoading) => !prevLoading);
       }
    }
    ///for changing in contact
    // const onContactChange = (event)=>{
    //     setContact({
    //         ...contact,
    //         [event.target.name] : [event.target.value]
    //     });
    // }
    //confirm alert ui : for delete contact
    const confirmDelete = (contactId , contactFullname)=>{
        confirmAlert({
            customUI:({onClose})=>{
                return(
                    <div
                        dir="rtl"
                        style={{
                            backgroundColor:CurrentLine,
                            border:`1px solid ${Purple}`,
                            borderRadius:"1em",
                        }}
                        className="p-4"
                    >
                         <h1 style={{color:Yellow}}> پاک کردن مخاطب </h1>
                        <p style={{color:Foreground}}>
                            مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی؟
                        </p>
                        <button
                            onClick={()=>{
                                removeContact(contactId);
                                onClose();
                            }}
                           className="btn mx-2"
                           style={{backgroundColor: Purple}}
                        >
                            مطمئن هستم
                        </button>
                        <button
                            onClick={onClose}
                            className="btn "
                            style={{backgroundColor:Comment}}
                        >
                                انصراف
                        </button>
                    </div>
                );
            }
        })
    }
    //for delete
    const removeContact = async (contactId)=>{
        //1. contacts copy
        const contactsBackup = [...contacts];
       try{
          //reRender

           //2.delete state
           // const updatedContact = contacts.filter(c => c.id !== contactId);
           // setContacts(updatedContact);
           // setFilteredContacts(updatedContact);

          //immer
           setContacts((draft) => draft.filter(c=> c.id !== contactId));
           setFilteredContacts((draft) => draft.filter(c=> c.id !== contactId));

           //3.send delete request to server
          const {status} = await deleteContact(contactId);

          toast.error(" مخاطب با موفقیت حذف شد. ");

          //4.check
          if(status !== 200){
              setContacts(contactsBackup);
              setFilteredContacts(contactsBackup);
          }
       }catch(err){
          console.log(err.message);
          //if there is error
           setContacts(contactsBackup);
           setFilteredContacts(contactsBackup);
       }
    }
    // let filterTimeout ;

    ///search contact
    const contactSearch =  _.debounce (query =>{
       // setContactQuery({ ...contactQuery , text: event.target.value});
       //  clearTimeout(filterTimeout);
        if(!query) return setFilteredContacts([...contacts]);

        console.log(query);

        // filterTimeout =  setTimeout(()=>{
        //    setFilteredContacts(
        //        contacts.filter((contact) =>{
        //            return contact.fullname
        //                .toString()
        //                .toLowerCase()
        //                .includes(query.toLowerCase());
        //        })
        //    );
       // },1000);
           setFilteredContacts((draft) =>
               draft.filter((c) =>
                   c.fullname.toString() .toLowerCase().includes(query.toLowerCase() )
               )
           );
    }, 1000);

  return (
      <ContactContext.Provider value={{
          loading,
          setLoading,
          // contact,
          setContacts,
          setFilteredContacts,
          // contactQuery,
          contacts,
          filteredContacts,
          groups,
          //for yup
          // errors,
          //
         // onContactChange,
          deleteContact:confirmDelete,
          createContact:createContactForm,
          contactSearch,
      }}>
          <div className="App">
              {/*episode 106*/}
              <ToastContainer
                  rtl={true}
                  position="top-right"
                  theme="colored"
              />
              {/*<Toaster/>*/}

              <Navbar   />
              <Routes>
                  <Route path="/" element={<Navigate to="/Contacts/" />}    />
                  <Route path="/Contacts"  element={<Contacts/>} />
                  <Route path="/Contacts/add"  element={<AddContact/>}/>
                  <Route path="/Contacts/:contactId" element={<ViewContact />} />
                  <Route path="/Contacts/edit/:contactId"
                         element={
                             <EditContact
                                 // forceRender={forceRender}
                                 // setForceRender={ setForceRender }
                             />
                         }
                  />
              </Routes>
              {/*<Contacts contacts={getContacts}  loading={loading}/>*/}
          </div>
      </ContactContext.Provider>
  );
}
export default App;
