import { faker } from "@faker-js/faker";

enum States {
  NCR = "NCR",
  UttarPradesh = "Uttar Pradesh",
  Haryana = "Haryana",
  Rajasthan = "Rajasthan",
}

enum CitiesNCR {
  Delhi = "Delhi",
  Noida = "Noida",
  Gurgaon = "Gurgaon",
}

enum CitiesUttarPradesh {
  Agra = "Agra",
  Lucknow = "Lucknow",
  Merrut = "Merrut",
}

enum CitiesHaryana {
  Karnal = "Karnal",
  Panipat = "Panipat",
}

enum CitiesRajasthan {
  Jaipur = "Jaipur",
  Jaiselmer = "Jaiselmer",
}

export const selectedState = faker.helpers.enumValue(States);

let city = "";

if (selectedState === States.NCR) {
   city = faker.helpers.enumValue(CitiesNCR);
} else if (selectedState === States.UttarPradesh) {
   city = faker.helpers.enumValue(CitiesUttarPradesh);
} else if (selectedState === States.Haryana) {
   city = faker.helpers.enumValue(CitiesHaryana);
} else if (selectedState === States.Rajasthan) {
   city = faker.helpers.enumValue(CitiesRajasthan);
}
export const selectedCity = city;