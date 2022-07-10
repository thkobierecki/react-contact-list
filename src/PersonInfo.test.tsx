import { render, screen, fireEvent } from '@testing-library/react';
import { PersonInfoType } from 'src/types';
import PersonInfo from "./PersonInfo";


// Mocks
const personInfo : PersonInfoType = {
  id: "1",
  firstNameLastName: "John Doe",
  emailAddress: "test@mail.com",
  jobTitle: "Test Engineer"
};

const handleClickItem = jest.fn();

describe("PersonInfo", () => {
  describe("when contact is not selected", () => {
    it("should render person information", () => {
      const { container } = render(<PersonInfo personInfo={personInfo} handleClickItem={handleClickItem} isSelected={false}/>);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("test@mail.com")).toBeInTheDocument();
      expect(screen.getByText("Test Engineer")).toBeInTheDocument();
      expect(container.firstChild).not.toHaveClass("selected-contact");
    });
    it("should handle contact selection", () =>{
      render(<PersonInfo personInfo={personInfo} handleClickItem={handleClickItem} isSelected={false}/>);
      fireEvent.click(screen.getByText("John Doe"));
      expect(handleClickItem).toHaveBeenCalledTimes(1);
      expect(handleClickItem).toHaveBeenCalledWith(personInfo, false);
    });
  });
  describe("when contact is selected", () => {
    it("should render the selected state", () => {
      const { container } = render(<PersonInfo personInfo={personInfo} handleClickItem={handleClickItem} isSelected={true}/>);
      expect(container.firstChild).toHaveClass("selected-contact");
    });
    it("should handle contact deselection", () =>{
      render(<PersonInfo personInfo={personInfo} handleClickItem={handleClickItem} isSelected={true}/>);
      fireEvent.click(screen.getByText("John Doe"));
      expect(handleClickItem).toHaveBeenCalledTimes(1);
      expect(handleClickItem).toHaveBeenCalledWith(personInfo, true);
    });
  });
})