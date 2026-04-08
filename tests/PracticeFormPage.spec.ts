import { baseURL } from "../helper/Credentials.ts";
import { test, expect } from "@playwright/test";
import PracticeFormPage from "../pages/PracticeFormPage";
import FullFilledForm from "../utils/FullFilledForm.json";
import PartiallyFilledForm from "../utils/PartiallyFilledForm.json";

let practiceFormPage: PracticeFormPage;

test.beforeEach(async ({ page }) => {
  practiceFormPage = new PracticeFormPage(page);
  await page.goto(baseURL, {
    waitUntil: "domcontentloaded",
  });
  await practiceFormPage.urlVerification(baseURL);
});

test.describe("PractiveForm processing", () => {
  test("Mandatory fields must be filled validation", async () => {
    await test.step("Fill Firstname, LastName and Email", async () => {
      await practiceFormPage.InputFirstName("Oleksandr");
      await practiceFormPage.InputLastName("Ivankiv");
      await practiceFormPage.InputEmail("oleksandr@test.com");
    });

    await test.step("Select gender and verify", async () => {
      await practiceFormPage.ClickMaleGenderRadioButton();
      await practiceFormPage.VerifyMaleRadioButtonIsChecked();
    });

    await test.step("Upload Image", async () => {
      await practiceFormPage.UploadImage();
    });

    await test.step("Click submit button and verify", async () => {
      await practiceFormPage.ClickSubmitButton();
      await practiceFormPage.VerifyCloseButtonIsHidden();
    });
  });

  test("Submit wih all fields are filled", async ({}) => {
    await test.step("Fill Firstname, LastName and Email", async () => {
      await practiceFormPage.InputFirstName("Oleksandr");
      await practiceFormPage.InputLastName("Ivankiv");
      await practiceFormPage.InputEmail("oleksandr@test.com");
    });

    await test.step("Select gender and verify", async () => {
      await practiceFormPage.ClickMaleGenderRadioButton();
      await practiceFormPage.VerifyMaleRadioButtonIsChecked();
    });

    await test.step("Fill phone and date of birth", async () => {
      await practiceFormPage.InputPhone("0684444444");
      await practiceFormPage.InputDateOfBirth("12 Dec 2004");
    });

    await test.step("Select subject and verify", async () => {
      await practiceFormPage.SelectSubject("Mat");
      await practiceFormPage.VerifyRemoveButtonIsVisible();
    });

    await test.step("Select Hobby and verify", async () => {
      await practiceFormPage.ClickMusicHobbyCheckbox();
      await practiceFormPage.VerifyMusicHobbiesCheckboxIsChecked();
    });

    await test.step("Upload image", async () => {
      await practiceFormPage.UploadImage();
    });

    await test.step("Fill address, select state and city", async () => {
      await practiceFormPage.InputCurrentAddress("5 World Way");
      await practiceFormPage.SelectStateDropdownUttarPradesh();
      await practiceFormPage.SelectCityDropdownMerrut();
    });

    await test.step("Click submit button and verify", async () => {
      await practiceFormPage.ClickSubmitButton();
      await practiceFormPage.VerifyCloseButtonIsVisible();
    });

    await test.step("verify form", async () => {
      await practiceFormPage.VerifySubmittedForm(FullFilledForm);
    });
  });

  test("Submit with partially filled form", async () => {
    await test.step("Fill Firstname, LastName and Email", async () => {
      await practiceFormPage.InputFirstName("Oleksandr");
      await practiceFormPage.InputLastName("Ivankiv");
      await practiceFormPage.InputEmail("oleksandr@test.com");
    });

    await test.step("Select gender and verify", async () => {
      await practiceFormPage.ClickMaleGenderRadioButton();
      await practiceFormPage.VerifyMaleRadioButtonIsChecked();
    });

    await test.step("Fill phone and date of birth", async () => {
      await practiceFormPage.InputPhone("0684444444");
      await practiceFormPage.InputDateOfBirth("12 Dec 2004");
    });

    await test.step("Select subject and verify", async () => {
      await practiceFormPage.SelectSubject("Mat");
      await practiceFormPage.VerifyRemoveButtonIsVisible();
    });

    await test.step("Select Hobby and verify", async () => {
      await practiceFormPage.ClickMusicHobbyCheckbox();
      await practiceFormPage.VerifyMusicHobbiesCheckboxIsChecked();
    });

    await test.step("Click submit button and verify", async () => {
      await practiceFormPage.ClickSubmitButton();
      await practiceFormPage.VerifyCloseButtonIsVisible();
    });

    await test.step("verify form", async () => {
      await practiceFormPage.VerifySubmittedForm(PartiallyFilledForm);
    });
  });
});
