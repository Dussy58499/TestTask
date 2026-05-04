import { selectedCity, selectedState } from "./SelectStateHelper";
import { address, email, firstName, formExpectedDate, lastName, phone, randomGender, randomHobbies, randomSubject } from "./testData";

export const expectedFullFilledFormData: Record<string, string> = {
  "Student Name": firstName + " " + lastName,
  "Student Email": email,
  "Gender": randomGender,
  "Mobile": phone,
  "Date of Birth": formExpectedDate,
  "Subjects": randomSubject,
  "Hobbies": randomHobbies,
  "Picture": "testImage.jpg",
  "Address": address,
  "State and City": selectedState + " " + selectedCity,
};