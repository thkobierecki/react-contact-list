import { useState, useCallback } from "react";
import useFetch from "src/hooks/useFetch";
import PersonInfo from "./PersonInfo";
import { PersonInfoType } from "./types";

function App() {
  const [selected, setSelected] = useState<PersonInfoType[]>([]);
  const [page, setPage] = useState(1);
  const {error, loading, list } = useFetch(page);

  //  TODO fetch contacts using apiData function, handle loading and error states
  

  const handleLoadMoreContacts = useCallback(()=>{
    setPage(page+1)
  },[page]);

  const handleSelectItem = (selectedContact : PersonInfoType) => {
    list.filter((item : PersonInfoType) => item.id !== selectedContact.id);
    setSelected((prev) => [...prev, selectedContact]);
  }

  

  return (
    <div className="App">
      <div className="selected">Selected contacts: {selected.length}</div>
      <div className="contactsWrapper">
        {list.map((personInfo) => (
          <PersonInfo
            key={personInfo.id}
            data={personInfo}
            handleSelectItem={handleSelectItem}
          />
        ))}
      </div>
      <button onClick={handleLoadMoreContacts} disabled={loading}>{loading ? "Loading..." : "Load More"}</button>
      {error ? <p>There was an erro, try again...</p> : null}
    </div>
  );
}

export default App;
