import test, { expect, Locator, Page } from "@playwright/test";
import { CommonPage } from "./Common";
import {
  randomDropDownOption,
  randomGender,
  randomHobbies,
} from "../helper/testData";
import { selectedCity, selectedState } from "../helper/SelectStateHelper";
import { th } from "@faker-js/faker";

export default class PracticeFormPage extends CommonPage {
  readonly firstNameInputField: Locator;
  readonly lastNameInputField: Locator;
  readonly emailInputField: Locator;
  readonly genderRadioButton: Locator;
  readonly phoneInputField: Locator;
  readonly hobbiesCheckbox: Locator;
  readonly uploadButton: Locator;
  readonly dateOfBirthPicker: Locator;
  readonly subjectsInputField: Locator;
  readonly currentAddressInputField: Locator;
  readonly stateDropdownInputField: Locator;
  readonly cityDropdownInputField: Locator;
  readonly submitButton: Locator;
  readonly closeButton: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInputField = page.getByRole("textbox", {
      name: "First Name",
    });
    this.lastNameInputField = page.getByRole("textbox", { name: "Last Name" });
    this.emailInputField = page.getByRole("textbox", {
      name: "name@example.com",
    });
    this.genderRadioButton = page.getByLabel(randomGender, { exact: true });
    this.phoneInputField = page.getByRole("textbox", { name: "Mobile Number" });
    this.hobbiesCheckbox = page.getByRole("checkbox", { name: randomHobbies });
    this.removeButton = page.getByRole("button", { name: `Remove` }).nth(0);
    this.uploadButton = page.locator("#uploadPicture");
    this.dateOfBirthPicker = page.locator("#dateOfBirthInput");
    this.subjectsInputField = page.locator("#subjectsInput");
    this.currentAddressInputField = page.getByRole("textbox", {
      name: "Current Address",
    });
    this.stateDropdownInputField = page.locator("#state");
    this.cityDropdownInputField = page.locator("#city");
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.closeButton = page.getByRole("button", { name: "Close" });
  }

  //Actions

  async inputFirstName(firstName: string) {
    await test.step("Fill Firstname", async () => {
      await this.firstNameInputField.fill(firstName);
    });
  }

  async inputLastName(lastName: string) {
    await test.step("Fill Lastname", async () => {
      await this.lastNameInputField.fill(lastName);
    });
  }

  async inputEmail(email: string) {
    await test.step("Fill Email", async () => {
      await this.emailInputField.fill(email);
    });
  }

  async inputPhone(phone: string) {
    await test.step("Fill Phone", async () => {
      await this.phoneInputField.fill(phone);
    });
  }

  async inputDateOfBirth(date: string) {
    await test.step("Fill Date", async () => {
      await this.dateOfBirthPicker.fill(date);
      await this.dateOfBirthPicker.press("Enter");
    });
  }

  async inputCurrentAddress(address: string) {
    await test.step("Fill Address", async () => {
      await this.currentAddressInputField.fill(address);
    });
  }

  async clickGenderRadioButton() {
    await test.step("Click Male gender radio button", async () => {
      await this.genderRadioButton.click();
    });
  }

  async clickHobbyCheckbox() {
    await test.step("Click Music hobby checkbox", async () => {
      await this.hobbiesCheckbox.click();
    });
  }

  async clickStateDropdown() {
    await test.step("Click State dropdown", async () => {
      await this.stateDropdownInputField.click();
    });
  }

  async clickCityDropdown() {
    await test.step("Click City dropdown", async () => {
      await this.cityDropdownInputField.click();
    });
  }

  async clickSubmitButton() {
    await test.step("Click Submit button", async () => {
      await this.submitButton.click();
    });
  }

  async selectSubject(subject: string) {
    await test.step("Select Subject", async () => {
      await this.subjectsInputField.fill(subject);
      await this.subjectsInputField.press("Enter");
    });
  }

  async selectStateDropdown() {
    await test.step("Select State", async () => {
      await this.clickStateDropdown();
      await this.stateDropdownInputField.getByText(selectedState).click();
    });
  }

  async selectCityDropdown() {
    await test.step("Select City", async () => {
      await this.clickCityDropdown();
      await this.cityDropdownInputField.getByText(selectedCity).click();
    });
  }

  async uploadImage() {
    await test.step("Upload Image", async () => {
      await this.uploadButton.setInputFiles("images/testImage.jpg");
    });
  }

  //Verification

  async verifyRadioButtonIsChecked() {
    await test.step("Gender is checked", async () => {
      await expect(this.genderRadioButton).toBeChecked();
    });
  }

  async verifyRadioButtonIsNotChecked() {
    await test.step("Gender is not checked", async () => {
      await expect(this.genderRadioButton).not.toBeChecked();
    });
  }

  async verifyHobbiesCheckboxIsChecked() {
    await test.step("Hobby is checked", async () => {
      await expect(this.hobbiesCheckbox).toBeChecked();
    });
  }

  async verifyCloseButtonIsHidden() {
    await test.step("Close button is hidden", async () => {
      await expect(this.closeButton).toBeHidden();
    });
  }

  async verifyCloseButtonIsVisible() {
    await test.step("Close button is visible", async () => {
      await expect(this.closeButton).toBeVisible();
    });
  }

  async verifyRemoveButtonIsVisible() {
    await test.step("Remove button is visible", async () => {
      await expect(this.removeButton).toBeVisible();
    });
  }

  async verifyPhoneNumberIsEmpty() {
    await test.step("Phone number is empty", async () => {
      await expect(this.phoneInputField).toBeEmpty();
    });
  }

  async verifyFirstNameIsEmpty() {
    await test.step("FirstName is empty", async () => {
      await expect(this.firstNameInputField).toBeEmpty();
    });
  }

  async verifyLastNameIsEmpty() {
    await test.step("LastName is empty", async () => {
      await expect(this.lastNameInputField).toBeEmpty();
    });
  }

  async verifyStateDropdownIsEnabled() {
    await test.step("State dropdown is enabled", async () => {
      await expect(this.stateDropdownInputField.isEnabled()).toBeTruthy();
    });
  }

  async verifyCityDropdownIsEnabled() {
    await test.step("City dropdown is enabled", async () => {
      await expect(this.cityDropdownInputField.isEnabled()).toBeTruthy();
    });
  }

  async verifyCityDropdownIsDisabled() {
    await test.step("City dropdown is disabled", async () => {
      await expect(this.cityDropdownInputField.isDisabled()).toBeTruthy();
    });
  }

  async verifyFirstNameIsFilled(expectedFirstName: string) {
    await test.step("FirstName is filled", async () => {
      await expect(this.firstNameInputField).toHaveValue(expectedFirstName);
    });
  }

  async verifyLastNameIsFilled(expectedLastName: string) {
    await test.step("LastName is filled", async () => {
      await expect(this.lastNameInputField).toHaveValue(expectedLastName);
    });
  }

  async verifyEmailIsFilled(expectedEmail: string) {
    await test.step("Email is filled", async () => {
      await expect(this.emailInputField).toHaveValue(expectedEmail);
    });
  }

  async verifyPhoneIsFilled(expectedPhone: string) {
    await test.step("Phone is filled", async () => {
      await expect(this.phoneInputField).toHaveValue(expectedPhone);
    });
  }
  async verifyDateOfBirthIsFilled(expectedDate: string) {
    await test.step("Date of Birth is filled", async () => {
      await expect(this.dateOfBirthPicker).toHaveValue(expectedDate);
    });
  }

  async verifyCurrentAddressIsFilled(expectedAddress: string) {
    await test.step("Current Address is filled", async () => {
      await expect(this.currentAddressInputField).toHaveValue(expectedAddress);
    });
  }

  async verifyRemoveButtonIsHidden() {
    await test.step("Remove button is hidden", async () => {
      await expect(this.removeButton).toBeHidden();
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
