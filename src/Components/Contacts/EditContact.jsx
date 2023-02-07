import {useEffect , useContext} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
//episode103
import { Formik , Field, Form ,ErrorMessage  } from "formik";
//for immer-episode105
import {useImmer } from 'use-immer';
//
//for toast-episode106
import {toast} from 'react-toastify';
//episode107
// import toast from 'react-hot-toast';
//
import{ContactContext} from "../../context/contactContext";

import{getContact, updateContact} from "../../services/contactService";

import {Spinner} from "../";
import {Comment, Orange, Purple} from "../../helpers/colors";

//episode103
import {contactSchema} from "../../validations/contactValidation";
//

const EditContact =({}) =>
{
    const {contactId}=useParams();
    //use context
    const{
        // contacts,
        setContacts,
        setFilteredContacts,
        loading,
        setLoading,
        groups
    } = useContext(ContactContext);

    const navigate = useNavigate();
    const [contact , setContact] = useImmer({});

    useEffect(() =>{
        const fetchData = async ()=>{
            try{
               setLoading(true);
               const {data:contactData} = await getContact(contactId);

                setLoading(false);
                setContact(contactData);
            }catch(err){
                console.log(err);
                setLoading(false);
            }
        }
        fetchData();
    },[])
    //for update value of input:get information
    // const onContactChange = (event)=>{
    //     setContact({
    //         ...contact,
    //         [event.target.name] : event.target.value
    //     });
    // };
    ///submit
    const submitForm = async(values)=> {
      try{
        // event.preventDefault();
            const {data, status } = await updateContact( values , contactId);
            /* ways for rendering:
            * 1- forcerender --> setForceRender(true) : update and refresh online
            *2- send request to server --> we get contact from server
            * 3-update local state    ** we use this way
            *4- update local state before sending request to server
             */
            if(status === 200 ){
                setLoading(false);

                 toast.info(" مخاطب با موفقیت ویرایش شد.");
                //1-get all contacts
                // const allContacts = [...contacts  ];
               //2.find index of contact
               //  const contactIndex = allContacts.findIndex(c => c.id === parseInt(contactId) );

                // allContacts[contactIndex] = {...data};

                setContacts((draft) =>{
                    const contactIndex = draft.findIndex(
                        (c) => c.id === parseInt(contactId)
                    );
                    draft[contactIndex] = { ...data};
                });
               setFilteredContacts((draft) =>{
                   const contactIndex = draft.findIndex(
                       (c) => c.id === parseInt(contactId)
                   );
                   draft[contactIndex] = { ...data};
               } );

                navigate("/contacts");
            }
        }
        catch(err) {
            console.log(err.message);
            setLoading(false);
        }
    };

 return(
   <>
       {loading ? <Spinner/> :(
           <>
           <section className="p-3">
                <div className="container">
                    <div className="row my-2">
                         <div className="col text-center">
                             <p className="h4 fw-bold "  style={{color: Orange}}>
                                     ویرایش مخاطب
                             </p>
                         </div>
                    </div>
                    <hr   style={{backgroundColor:Orange}}/>

                    <div
                        className="row p-2 w-75 mx-auto align-items-center"
                        style = {{backgroundColor:"#44475a" , borderRadius:"1rem"}}
                    >
                        <div className="col-md-8">
                            <Formik
                                initialValues = {contact}
                                validationSchema = {contactSchema }
                                onSubmit = { (values) => {
                                    submitForm(values);
                                }}
                            >
                                {/*episode103*/}
                                <Form >
                                    <div className="mb-2">
                                        <Field
                                            name="fullname"
                                            type="text"
                                            className="form-control"
                                            placeholder="نام و نام خانوادگی"
                                        />

                                        <ErrorMessage
                                            name="fullname"
                                            render={msg =>(
                                                <div className="text-danger"> {msg}</div>
                                            ) }
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <Field
                                            name="photo"
                                            type="text"
                                            className="form-control"
                                            placeholder="آدرس تصویر"
                                        />
                                        <ErrorMessage
                                            name="photo"
                                            render={msg => (
                                                <div className="text-danger"> {msg}</div>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <Field
                                            name="mobile"
                                            type="number"
                                            className="form-control"
                                            placeholder="شماره موبایل"
                                        />

                                        <ErrorMessage
                                            name="mobile"
                                            render={msg => (
                                                <div className="text-danger"> {msg}</div>
                                            ) }
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <Field
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            placeholder="آدرس ایمیل"
                                        />

                                        <ErrorMessage
                                            name="email"
                                            render={msg =>(
                                                <div className="text-danger"> {msg}</div>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <Field
                                            name="job"
                                            type="text"
                                            className="form-control"
                                            placeholder="شغل"
                                        />

                                        <ErrorMessage
                                            name="job"
                                            render={msg => (
                                                <div className="text-danger"> {msg}</div>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <Field
                                            name="group"
                                            as = "select"
                                            className="form-control"
                                        >
                                            <ErrorMessage
                                                name="group"
                                                render={msg =>(
                                                    <div className="text-danger"> {msg}</div>
                                                )}
                                            />

                                            <option > انتخاب گروه </option>

                                            { groups.length>0 &&  groups.map((group) =>(
                                                <option key={group.id} value={group.id}>
                                                    {group.name}
                                                </option>
                                            ))
                                            }
                                        </Field>
                                    </div>
                                    <div className="mx-2">
                                        <input
                                            type="submit"
                                            className="btn"
                                            style={{backgroundColor: Purple}}
                                            value="ویرایش  مخاطب "
                                        />
                                        <Link
                                            to={"/contacts"}
                                            className="btn mx-2"
                                            style={{backgroundColor:Comment}}
                                        >
                                            انصراف
                                        </Link>
                                    </div>
                                </Form>
                            </Formik>
                            {/**/}
                        {/*    <form>*/}
                        </div>
                        <div className="col-md-4">
                           <img
                               src={contact.photo}
                               alt=""
                               className="img-fluid rounded"
                               style={{border: `1px solid ${Purple}` }}
                           />
                        </div>
                    </div>
                </div>
               <div className="text-center mt-1">
                   <img
                       src={require("../../assets/man-taking-note.png")}
                       alt=""
                       height="300px"
                       style={{opacity: "60%"}}
                   />
               </div>
           </section>

           </>
       )}
   </>
 );
}
export default EditContact;