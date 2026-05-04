import { faker } from "@faker-js/faker";
import { format } from "date-fns";

enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
};

enum Hobbies {
  Sports = "Sports",
  Reading = "Reading",
  Music = "Music",
};

enum Subjects {
  Maths = "Maths",
  Physics = "Physics",
  Chemistry = "Chemistry",
  Biology = "Biology",
  ComputerScience = "Computer Science",
  English = "English",
  History = "History"
};

const randomDate = faker.date.between({
  from: new Date("1950-01-01"),
  to: new Date("2010-01-01"),
});

const maxDropDownOptions = 4;

export const randomGender = faker.helpers.enumValue(Gender);
export const randomHobbies = faker.helpers.enumValue(Hobbies);
export const randomSubject = faker.helpers.enumValue(Subjects);
export const firstName = faker.person.firstName();
export const lastName = faker.person.lastName();
export const email = faker.internet.email();
export const phone = faker.string.numeric(10);
export const invalidNumericPhone = faker.string.numeric(9);
export const invalidAlphabeticalPhone = faker.string.alphanumeric(10);
export const invalidSubject = faker.string.numeric(4);
export const address = faker.location.streetAddress();
export const date = format(randomDate, "dd MMM yyyy");
export const formExpectedDate = format(randomDate, "dd MMMM,yyyy");
export const randomDropDownOption = faker.number.int({ min: 1, max: maxDropDownOptions });






