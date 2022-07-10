export type PersonInfoType = {
  firstNameLastName: string;
  jobTitle: string;
  emailAddress: string;
  id: string;
}

export type ContactsResponseType = {
  contactsList: PersonInfoType[];
  hasNextPage: boolean;
}