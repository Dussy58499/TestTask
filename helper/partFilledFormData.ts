import { email, firstName, formExpectedDate, lastName, phone, randomGender, randomHobbies, randomSubject } from "./testData";

export const expectedPartFilledFormData: Record<string, string> = {
  "Student Name": firstName + " " + lastName,
  "Student Email": email,
  "Gender": randomGender,
  "Mobile": phone,
  "Date of Birth": formExpectedDate,
  "Subjects": randomSubject,
  "Hobbies": randomHobbies,
  "Picture": "",
  "Address": "",
  "State and City": "",
};