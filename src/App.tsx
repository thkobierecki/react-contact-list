import { useState, useCallback } from "react";
import { Circles } from  'react-loader-spinner'
import useFetchContacts from "src/hooks/useFetchContacts";
import PersonInfo from "./PersonInfo";
import { PersonInfoType } from "./types";

function App() {
  const [selected, setSelected] = useState<PersonInfoType[]>([]);
  const [page, setPage] = useState(1);
  const {error, loading, contactsList, hasNextPage } = useFetchContacts(page);

  const handleLoadMoreContacts = useCallback(()=>{
    setPage(page+1)
  },[page]);

  const isContactSelected = (contact: PersonInfoType) => selected.includes(contact);

  const handleClickItem =useCallback((selectedContact : PersonInfoType, isSelected?:boolean)=> {
    if(isSelected){
      const filteredContacts = selected.filter(contact => contact.id !== selectedContact.id)
      setSelected(filteredContacts);
    }else{
      setSelected((prev) => [...prev, selectedContact]);
    }
  },[selected]);

  const getAllContacts = () => {
    const filteredContacts = contactsList.filter(contact => !isContactSelected(contact));
    return filteredContacts
  }

  return (
    <div className="App">
      <section>
        <h1 className="selected">Selected contacts</h1>
        <div className="contactsWrapper">
          {
            selected.length > 0 ?
              selected.map((personInfo) => (
                <PersonInfo
                  key={personInfo.id}
                  personInfo={personInfo}
                  handleClickItem={handleClickItem}
                  isSelected={isContactSelected(personInfo)}
                />
            )) :  <p>You have no selected contacts yet.</p>
          }
        </div>
      </section>
      <section>
        <h1>All contacts</h1>
        <div className="contactsWrapper">
          {getAllContacts().map((personInfo) => (
            <PersonInfo
              key={personInfo.id}
              personInfo={personInfo}
              handleClickItem={handleClickItem}
            />
          ))}
      </div>
      </section>
     {hasNextPage &&
      <button
          onClick={handleLoadMoreContacts}
          disabled={loading}
        >
          {loading ? 
            <Circles
            height="20"
            width="20"
            color='white'
            ariaLabel='loading'
            /> :
            "Load More"}
        </button>
      }
      {error && <p>There was an error, try to load contacts again.</p>}
    </div>
  );
}

export default App;
