import { baseURL } from "../helper/Credentials.ts";
import { test } from "@playwright/test";
import PracticeFormPage from "../pages/PracticeFormPage";
import {firstName,lastName,email,phone,date,address,randomSubject, invalidNumericPhone, invalidAlphabeticalPhone, invalidSubject} from "../helper/testData.ts"
import { expectedFullFilledFormData } from "../helper/fullFilledFormdata.ts";
import { expectedPartFilledFormData } from "../helper/partFilledFormData.ts";


let practiceFormPage: PracticeFormPage;

test.beforeEach(async ({ page }) => {
  practiceFormPage = new PracticeFormPage(page);
  await page.goto(baseURL, {
    waitUntil: "domcontentloaded",
  });
  await practiceFormPage.urlVerification(baseURL);
});

test.describe("PracticeForm processing", () => {
  test("Phone mandatory field is not filled", async () => {
    await practiceFormPage.inputFirstName(firstName);
    await practiceFormPage.inputLastName(lastName);
    await practiceFormPage.clickGenderRadioButton();
    await practiceFormPage.verifyRadioButtonIsChecked();
    await practiceFormPage.verifyPhoneNumberIsEmpty();
    await practiceFormPage.verifyFirstNameIsFilled(firstName);
    await practiceFormPage.verifyLastNameIsFilled(lastName);
    await practiceFormPage.clickSubmitButton();
    await practiceFormPage.verifyCloseButtonIsHidden();
  });

    test("Invalid Digit Phone validation", async () => {
    await practiceFormPage.inputFirstName(firstName);
    await practiceFormPage.inputLastName(lastName);
    await practiceFormPage.clickGenderRadioButton();
    await practiceFormPage.inputPhone(invalidNumericPhone);
    await practiceFormPage.verifyRadioButtonIsChecked();
    await practiceFormPage.verifyFirstNameIsFilled(firstName);
    await practiceFormPage.verifyLastNameIsFilled(lastName);
    await practiceFormPage.verifyPhoneIsFilled(invalidNumericPhone);
    await practiceFormPage.clickSubmitButton();
    await practiceFormPage.verifyCloseButtonIsHidden();
  });

    test("Invalid Numeric Phone validation", async () => {
    await practiceFormPage.inputFirstName(firstName);
    await practiceFormPage.inputLastName(lastName);
    await practiceFormPage.clickGenderRadioButton();
    await practiceFormPage.verifyRadioButtonIsChecked();
    await practiceFormPage.inputPhone(invalidAlphabeticalPhone);
    await practiceFormPage.verifyFirstNameIsFilled(firstName);
    await practiceFormPage.verifyLastNameIsFilled(lastName);
    await practiceFormPage.verifyPhoneIsFilled(invalidAlphabeticalPhone);
    await practiceFormPage.clickSubmitButton();
    await practiceFormPage.verifyCloseButtonIsHidden();
  });

    test("FirstName mandatory field is not filled", async () => {
    await practiceFormPage.inputLastName(lastName);
    await practiceFormPage.clickGenderRadioButton();
    await practiceFormPage.verifyRadioButtonIsChecked();
    await practiceFormPage.inputPhone(phone);
    await practiceFormPage.verifyFirstNameIsEmpty();
    await practiceFormPage.verifyLastNameIsFilled(lastName);
    await practiceFormPage.verifyPhoneIsFilled(phone);
    await practiceFormPage.clickSubmitButton();
    await practiceFormPage.verifyCloseButtonIsHidden();
  });

    test("LastName mandatory field is not filled", async () => {
    await practiceFormPage.inputFirstName(firstName);
    await practiceFormPage.clickGenderRadioButton();
    await practiceFormPage.verifyRadioButtonIsChecked();
    await practiceFormPage.inputPhone(phone);
    await practiceFormPage.verifyLastNameIsEmpty();
    await practiceFormPage.verifyFirstNameIsFilled(firstName);
    await practiceFormPage.verifyPhoneIsFilled(phone);
    await practiceFormPage.clickSubmitButton();
    await practiceFormPage.verifyCloseButtonIsHidden();
  });

    test("Gender mandatory field is not checked", async () => {
    await practiceFormPage.inputFirstName(firstName);
    await practiceFormPage.inputLastName(lastName);
    await practiceFormPage.verifyRadioButtonIsNotChecked();
    await practiceFormPage.inputPhone(phone);
    await practiceFormPage.verifyFirstNameIsFilled(firstName);
    await practiceFormPage.verifyLastNameIsFilled(lastName);
    await practiceFormPage.verifyPhoneIsFilled(phone);
    await practiceFormPage.clickSubmitButton();
    await practiceFormPage.verifyCloseButtonIsHidden();
  });

    test("Invalid Subject select validation", async () => {
    await practiceFormPage.clickGenderRadioButton();
    await practiceFormPage.inputPhone(phone);
    await practiceFormPage.selectSubject(invalidSubject);
    await practiceFormPage.verifyRemoveButtonIsHidden();
    await practiceFormPage.verifyRadioButtonIsChecked();
    await practiceFormPage.verifyPhoneIsFilled(phone);
    await practiceFormPage.clickSubmitButton();
    await practiceFormPage.verifyCloseButtonIsHidden();
  });

  test("Submit with all fields are filled", async ({}) => {
    await practiceFormPage.inputFirstName(firstName);
    await practiceFormPage.inputLastName(lastName);
    await practiceFormPage.inputEmail(email);
    await practiceFormPage.clickGenderRadioButton();
    await practiceFormPage.verifyRadioButtonIsChecked();
    await practiceFormPage.inputPhone(phone);
    await practiceFormPage.inputDateOfBirth(date);
    await practiceFormPage.selectSubject(randomSubject);
    await practiceFormPage.verifyRemoveButtonIsVisible();
    await practiceFormPage.clickHobbyCheckbox();
    await practiceFormPage.verifyHobbiesCheckboxIsChecked();
    await practiceFormPage.uploadImage();
    await practiceFormPage.inputCurrentAddress(address);
    await practiceFormPage.verifyStateDropdownIsEnabled();
    await practiceFormPage.verifyCityDropdownIsDisabled();
    await practiceFormPage.selectStateDropdown();
    await practiceFormPage.verifyCityDropdownIsEnabled();
    await practiceFormPage.selectCityDropdown();
    await practiceFormPage.verifyFirstNameIsFilled(firstName);
    await practiceFormPage.verifyLastNameIsFilled(lastName);
    await practiceFormPage.verifyEmailIsFilled(email);
    await practiceFormPage.verifyPhoneIsFilled(phone);
    await practiceFormPage.verifyDateOfBirthIsFilled(date);
    await practiceFormPage.verifyCurrentAddressIsFilled(address);
    await practiceFormPage.clickSubmitButton();
    await practiceFormPage.verifyCloseButtonIsVisible();
    await practiceFormPage.verifySubmittedForm(expectedFullFilledFormData);
  });

  test("Submit with partially filled form", async () => {
    await practiceFormPage.inputFirstName(firstName);
    await practiceFormPage.inputLastName(lastName);
    await practiceFormPage.inputEmail(email);
    await practiceFormPage.clickGenderRadioButton();
    await practiceFormPage.verifyRadioButtonIsChecked();
    await practiceFormPage.inputPhone(phone);
    await practiceFormPage.inputDateOfBirth(date);
    await practiceFormPage.selectSubject(randomSubject);
    await practiceFormPage.verifyRemoveButtonIsVisible();
    await practiceFormPage.clickHobbyCheckbox();
    await practiceFormPage.verifyHobbiesCheckboxIsChecked();
    await practiceFormPage.verifyFirstNameIsFilled(firstName);
    await practiceFormPage.verifyLastNameIsFilled(lastName);
    await practiceFormPage.verifyEmailIsFilled(email);
    await practiceFormPage.verifyPhoneIsFilled(phone);
    await practiceFormPage.verifyDateOfBirthIsFilled(date);
    await practiceFormPage.clickSubmitButton();
    await practiceFormPage.verifyCloseButtonIsVisible();
    await practiceFormPage.verifySubmittedForm(expectedPartFilledFormData);
  });
});