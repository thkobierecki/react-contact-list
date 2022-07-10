import { PersonInfoType } from 'src/types'

type Props = {
  personInfo: PersonInfoType;
  handleClickItem: (personInfo: PersonInfoType, isSelected?:boolean) => void;
  isSelected?: boolean;
};

function PersonInfo(props: Props) {
  const {
    personInfo,
    isSelected,
    handleClickItem
  } = props;
  const {
    firstNameLastName,
    jobTitle,
    emailAddress
  } = personInfo;
  return (
    <div
      className={`person-info ${isSelected && "selected-contact"}`}
      onClick={() => handleClickItem(personInfo, isSelected)}
    >
      <div className="firstNameLastName">{firstNameLastName}</div>
      <div className="jobTitle">{jobTitle}</div>
      <div className="emailAddress">{emailAddress}</div>
    </div>
  );
}

export default PersonInfo;
