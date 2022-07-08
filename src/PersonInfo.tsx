import { PersonInfoType } from 'src/types'

type Props = {
  data: PersonInfoType;
  handleSelectItem: (selectedContact: PersonInfoType) => void;
};

function PersonInfo(props: Props) {
  const { data, handleSelectItem } = props;
  return (
    <div
      style={{
        display: "flex",
        height: "100px",
        justifyContent: "center",
        flexDirection: "column",
        padding: "32px",
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
        margin: "10px 5px",
        background: "#fff",
        cursor: "pointer",
        flex: 1
      }}
      className="person-info"
      onClick={() => handleSelectItem(data)}
    >
      <div className="firstNameLastName">{data.firstNameLastName}</div>
      <div className="jobTitle">{data.jobTitle}</div>
      <div className="emailAddress">{data.emailAddress}</div>
    </div>
  );
}

export default PersonInfo;
