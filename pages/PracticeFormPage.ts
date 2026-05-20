import test, { expect, Locator, Page } from "@playwright/test";
import { CommonPage } from "./Common";
import { randomGender, randomHobbies } from "../helper/testData";
import { selectedCity, selectedState } from "../helper/SelectStateHelper";

export default class PracticeFormPage extends CommonPage {
  readonly mandatoryFields: {
    readonly firstNameInputField: Locator;
    readonly lastNameInputField: Locator;
    readonly genderRadioButton: Locator;
    readonly phoneInputField: Locator;
  };

  readonly optionalFields: {
    emailInputField: Locator;
    hobbiesCheckbox: Locator;
    uploadButton: Locator;
    dateOfBirthPicker: Locator;
    subjectsInputField: Locator;
    removeButton: Locator;
    currentAddressInputField: Locator;
    stateDropdownInputField: Locator;
    cityDropdownInputField: Locator;
  };

  readonly actionButons: {
    submitButton: Locator;
    closeButton: Locator;
  };

  constructor(page: Page) {
    super(page);
    this.mandatoryFields = {
      firstNameInputField: page.getByRole("textbox", { name: "First Name" }),
      genderRadioButton: page.getByLabel(randomGender, { exact: true }),
      phoneInputField: page.getByRole("textbox", { name: "Mobile Number" }),
      lastNameInputField: page.getByRole("textbox", { name: "Last Name" }),
    };

    this.optionalFields = {
      emailInputField: page.getByRole("textbox", { name: "name@example.com" }),
      hobbiesCheckbox: page.getByRole("checkbox", { name: randomHobbies }),
      removeButton: page.getByRole("button", { name: `Remove` }).nth(0),
      uploadButton: page.locator("#uploadPicture"),
      dateOfBirthPicker: page.locator("#dateOfBirthInput"),
      subjectsInputField: page.locator("#subjectsInput"),
      currentAddressInputField: page.getByRole("textbox", {
        name: "Current Address",
      }),
      stateDropdownInputField: page.locator("#state"),
      cityDropdownInputField: page.locator("#city"),
    };

    this.actionButons = {
      submitButton: page.getByRole("button", { name: "Submit" }),
      closeButton: page.getByRole("button", { name: "Close" }),
    };
  }

  //Actions

  async inputFirstName(firstName: string) {
    await test.step("Fill Firstname", async () => {
      await this.mandatoryFields.firstNameInputField.fill(firstName);
    });
  }

  async inputLastName(lastName: string) {
    await test.step("Fill Lastname", async () => {
      await this.mandatoryFields.lastNameInputField.fill(lastName);
    });
  }

  async inputEmail(email: string) {
    await test.step("Fill Email", async () => {
      await this.optionalFields.emailInputField.fill(email);
    });
  }

  async inputPhone(phone: string) {
    await test.step("Fill Phone", async () => {
      await this.mandatoryFields.phoneInputField.fill(phone);
    });
  }

  async inputDateOfBirth(date: string) {
    await test.step("Fill Date", async () => {
      await this.optionalFields.dateOfBirthPicker.fill(date);
      await this.optionalFields.dateOfBirthPicker.press("Enter");
    });
  }

  async inputCurrentAddress(address: string) {
    await test.step("Fill Address", async () => {
      await this.optionalFields.currentAddressInputField.fill(address);
    });
  }

  async clickGenderRadioButton() {
    await test.step("Click Male gender radio button", async () => {
      await this.mandatoryFields.genderRadioButton.click();
    });
  }

  async clickHobbyCheckbox() {
    await test.step("Click Music hobby checkbox", async () => {
      await this.optionalFields.hobbiesCheckbox.click();
    });
  }

  async clickStateDropdown() {
    await test.step("Click State dropdown", async () => {
      await this.optionalFields.stateDropdownInputField.click();
    });
  }

  async clickCityDropdown() {
    await test.step("Click City dropdown", async () => {
      await this.optionalFields.cityDropdownInputField.click();
    });
  }

  async clickSubmitButton() {
    await test.step("Click Submit button", async () => {
      await this.actionButons.submitButton.click();
    });
  }

  async selectSubject(subject: string) {
    await test.step("Select Subject", async () => {
      await this.optionalFields.subjectsInputField.fill(subject);
      await this.optionalFields.subjectsInputField.press("Enter");
    });
  }

  async selectStateDropdown() {
    await test.step("Select State", async () => {
      await this.clickStateDropdown();
      await this.optionalFields.stateDropdownInputField
        .getByText(selectedState)
        .click();
    });
  }

  async selectCityDropdown() {
    await test.step("Select City", async () => {
      await this.clickCityDropdown();
      await this.optionalFields.cityDropdownInputField
        .getByText(selectedCity)
        .click();
    });
  }

  async uploadImage() {
    await test.step("Upload Image", async () => {
      await this.optionalFields.uploadButton.setInputFiles(
        "images/testImage.jpg",
      );
    });
  }

  async fillMandatoryFields(
    firstName: string,
    lastName: string,
    phone?: string,
  ) {
    await test.step("Fill Mandatory Fields", async () => {
      await this.inputFirstName(firstName);
      await this.inputLastName(lastName);
      await this.clickGenderRadioButton();
      if (phone) {
        await this.inputPhone(phone);
      }
      await this.verifyRadioButtonIsChecked();
      await this.verifyFirstNameIsFilled(firstName);
      await this.verifyLastNameIsFilled(lastName);
    });
  }

  async fillAllFields(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    date: string,
    randomSubject: string,
    address: string,
  ) {
    await test.step("Fill All Fields", async () => {
      await this.inputFirstName(firstName);
      await this.inputLastName(lastName);
      await this.inputEmail(email);
      await this.clickGenderRadioButton();
      await this.verifyRadioButtonIsChecked();
      await this.inputPhone(phone);
      await this.inputDateOfBirth(date);
      await this.selectSubject(randomSubject);
      await this.verifyRemoveButtonIsVisible();
      await this.clickHobbyCheckbox();
      await this.verifyHobbiesCheckboxIsChecked();
      await this.uploadImage();
      await this.inputCurrentAddress(address);
      await this.verifyStateDropdownIsEnabled();
      await this.verifyCityDropdownIsDisabled();
      await this.selectStateDropdown();
      await this.verifyCityDropdownIsEnabled();
      await this.selectCityDropdown();
      await this.verifyFirstNameIsFilled(firstName);
      await this.verifyLastNameIsFilled(lastName);
      await this.verifyEmailIsFilled(email);
      await this.verifyPhoneIsFilled(phone);
      await this.verifyDateOfBirthIsFilled(date);
      await this.verifyCurrentAddressIsFilled(address);
    });
  }

  async fillPartiallyFormFields(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    date: string,
    randomSubject: string,
  ) {
    await test.step("Fill Partially Fields", async () => {
      await this.inputFirstName(firstName);
      await this.inputLastName(lastName);
      await this.inputEmail(email);
      await this.clickGenderRadioButton();
      await this.verifyRadioButtonIsChecked();
      await this.inputPhone(phone);
      await this.inputDateOfBirth(date);
      await this.selectSubject(randomSubject);
      await this.verifyRemoveButtonIsVisible();
      await this.clickHobbyCheckbox();
      await this.verifyHobbiesCheckboxIsChecked();
      await this.verifyFirstNameIsFilled(firstName);
      await this.verifyLastNameIsFilled(lastName);
      await this.verifyEmailIsFilled(email);
      await this.verifyPhoneIsFilled(phone);
      await this.verifyDateOfBirthIsFilled(date);
    });
  }

  //Verification

  async verifyRadioButtonIsChecked() {
    await test.step("Gender is checked", async () => {
      await expect(this.mandatoryFields.genderRadioButton).toBeChecked();
    });
  }

  async verifyRadioButtonIsNotChecked() {
    await test.step("Gender is not checked", async () => {
      await expect(this.mandatoryFields.genderRadioButton).not.toBeChecked();
    });
  }

  async verifyHobbiesCheckboxIsChecked() {
    await test.step("Hobby is checked", async () => {
      await expect(this.optionalFields.hobbiesCheckbox).toBeChecked();
    });
  }

  async verifyCloseButtonIsHidden() {
    await test.step("Close button is hidden", async () => {
      await expect(this.actionButons.closeButton).toBeHidden();
    });
  }

  async verifyCloseButtonIsVisible() {
    await test.step("Close button is visible", async () => {
      await expect(this.actionButons.closeButton).toBeVisible();
    });
  }

  async verifyRemoveButtonIsVisible() {
    await test.step("Remove button is visible", async () => {
      await expect(this.optionalFields.removeButton).toBeVisible();
    });
  }

  async verifyPhoneNumberIsEmpty() {
    await test.step("Phone number is empty", async () => {
      await expect(this.mandatoryFields.phoneInputField).toBeEmpty();
    });
  }

  async verifyFirstNameIsEmpty() {
    await test.step("FirstName is empty", async () => {
      await expect(this.mandatoryFields.firstNameInputField).toBeEmpty();
    });
  }

  async verifyLastNameIsEmpty() {
    await test.step("LastName is empty", async () => {
      await expect(this.mandatoryFields.lastNameInputField).toBeEmpty();
    });
  }

  async verifyStateDropdownIsEnabled() {
    await test.step("State dropdown is enabled", async () => {
      await expect(
        this.optionalFields.stateDropdownInputField.isEnabled(),
      ).toBeTruthy();
    });
  }

  async verifyCityDropdownIsEnabled() {
    await test.step("City dropdown is enabled", async () => {
      await expect(
        this.optionalFields.cityDropdownInputField.isEnabled(),
      ).toBeTruthy();
    });
  }

  async verifyCityDropdownIsDisabled() {
    await test.step("City dropdown is disabled", async () => {
      await expect(
        this.optionalFields.cityDropdownInputField.isDisabled(),
      ).toBeTruthy();
    });
  }

  async verifyFirstNameIsFilled(expectedFirstName: string) {
    await test.step("FirstName is filled", async () => {
      await expect(this.mandatoryFields.firstNameInputField).toHaveValue(
        expectedFirstName,
      );
    });
  }

  async verifyLastNameIsFilled(expectedLastName: string) {
    await test.step("LastName is filled", async () => {
      await expect(this.mandatoryFields.lastNameInputField).toHaveValue(
        expectedLastName,
      );
    });
  }

  async verifyEmailIsFilled(expectedEmail: string) {
    await test.step("Email is filled", async () => {
      await expect(this.optionalFields.emailInputField).toHaveValue(
        expectedEmail,
      );
    });
  }

  async verifyPhoneIsFilled(expectedPhone: string) {
    await test.step("Phone is filled", async () => {
      await expect(this.mandatoryFields.phoneInputField).toHaveValue(
        expectedPhone,
      );
    });
  }
  async verifyDateOfBirthIsFilled(expectedDate: string) {
    await test.step("Date of Birth is filled", async () => {
      await expect(this.optionalFields.dateOfBirthPicker).toHaveValue(
        expectedDate,
      );
    });
  }

  async verifyCurrentAddressIsFilled(expectedAddress: string) {
    await test.step("Current Address is filled", async () => {
      await expect(this.optionalFields.currentAddressInputField).toHaveValue(
        expectedAddress,
      );
    });
  }

  async verifyRemoveButtonIsHidden() {
    await test.step("Remove button is hidden", async () => {
      await expect(this.optionalFields.removeButton).toBeHidden();
    });
  }

  async verifySubmittedForm(expectedData: Record<string, string>) {
    await test.step("Submitted form is verified", async () => {
      for (const [label, value] of Object.entries(expectedData)) {
        const row = this.page.locator("tr", {
          has: this.page.locator("td").first().filter({ hasText: label }),
        });

        await expect(row.locator("td").nth(1)).toHaveText(value);
      }
    });
  }
}
