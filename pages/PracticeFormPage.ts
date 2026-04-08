import { expect, Locator, Page } from "@playwright/test";
import { CommonPage } from "./Common";

export default class PracticeFormPage extends CommonPage {
  readonly firstNameInputField: Locator;
  readonly lastNameInputField: Locator;
  readonly emailInputField: Locator;
  readonly maleGenderRadioButton: Locator;
  readonly phoneInputField: Locator;
  readonly musicHobbiesCheckbox: Locator;
  readonly uploadButton: Locator;
  readonly dateOfBirthPicker: Locator;
  readonly subjectsInputField: Locator;
  readonly currentAddressInputField: Locator;
  readonly stateDropdown: Locator;
  readonly cityDropdown: Locator;
  readonly submitButton: Locator;
  readonly closeButton: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInputField = page.getByRole("textbox", {name: "First Name",});
    this.lastNameInputField = page.getByRole("textbox", { name: "Last Name" });
    this.emailInputField = page.getByRole("textbox", {name: "name@example.com",});
    this.maleGenderRadioButton = page.getByLabel("Male", { exact: true });
    this.phoneInputField = page.getByRole("textbox", { name: "Mobile Number" });
    this.musicHobbiesCheckbox = page.getByRole("checkbox", { name: "Music" });
    this.uploadButton = page.locator("#uploadPicture");
    this.dateOfBirthPicker = page.locator("#dateOfBirthInput");
    this.subjectsInputField = page.locator("#subjectsInput");
    this.currentAddressInputField = page.getByRole("textbox", {name: "Current Address",});
    this.stateDropdown = page.locator("#state");
    this.cityDropdown = page.locator("#city");
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.closeButton = page.getByRole("button", { name: "Close" });
    this.removeButton = page.getByRole("button", { name: "Remove Maths" });
  }

  async InputFirstName(firstName: string) {
    await this.firstNameInputField.fill(firstName);
  }

  async InputLastName(lastName: string) {
    await this.lastNameInputField.fill(lastName);
  }

  async InputEmail(email: string) {
    await this.emailInputField.fill(email);
  }

  async InputPhone(phone: string) {
    await this.phoneInputField.fill(phone);
  }

  async InputDateOfBirth(date: string) {
    await this.dateOfBirthPicker.fill(date);
    await this.dateOfBirthPicker.press("Enter");
  }

  async InputCurrentAddress(address: string) {
    await this.currentAddressInputField.fill(address);
  }

  async ClickMaleGenderRadioButton() {
    await this.maleGenderRadioButton.click();
  }

  async ClickMusicHobbyCheckbox() {
    await this.musicHobbiesCheckbox.click();
  }

  async ClickDateOfBirth() {
    await this.dateOfBirthPicker.click();
  }

  async ClickStateDropdown() {
    await this.stateDropdown.click();
  }

  async ClickCityDropdown() {
    await this.cityDropdown.click();
  }

  async ClickSubmitButton() {
    await this.submitButton.click();
  }

  async SelectSubject(subject: string) {
    await this.subjectsInputField.fill(subject);
    await this.subjectsInputField.press("Enter");
  }

  async SelectStateDropdownUttarPradesh() {
    await this.ClickStateDropdown();
    this.stateDropdown.press("ArrowDown");
    this.stateDropdown.press("Enter");
  }

  async SelectCityDropdownMerrut() {
    await this.ClickCityDropdown();
    this.cityDropdown.press("ArrowDown");
    this.cityDropdown.press("ArrowDown");
    this.cityDropdown.press("Enter");
  }

  async UploadImage() {
    await this.uploadButton.setInputFiles("images/testImage.jpg");
  }
  async VerifyMaleRadioButtonIsChecked() {
    await expect(this.maleGenderRadioButton).toBeChecked();
  }

  async VerifyCloseButtonIsHidden() {
    await expect(this.closeButton).toBeHidden();
  }

  async VerifyCloseButtonIsVisible() {
    await expect(this.closeButton).toBeVisible();
  }

  async VerifyRemoveButtonIsVisible() {
    await expect(this.removeButton).toBeVisible();
  }

  async VerifyMusicHobbiesCheckboxIsChecked() {
    await expect(this.musicHobbiesCheckbox).toBeChecked();
  }

  async VerifySubmittedForm(expectedData: Record<string, string>) {
    for (const [label, value] of Object.entries(expectedData)) {
      const row = this.page.locator("tr", {
        has: this.page.locator("td").first().filter({ hasText: label }),
      });

      await expect(row.locator("td").nth(1)).toHaveText(value);
    }
  }
}
