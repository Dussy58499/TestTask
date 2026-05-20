import { test } from "@playwright/test";
import BookStoreApi from "../pages/BookStoreApi";
import { userData } from "../helper/testData";

let bookStoreApi: BookStoreApi;

test.beforeEach(async ({request }) => {
  bookStoreApi = new BookStoreApi(request);

});

test.describe("API tests", () => {
  test("User life cycle", async ({}) => {

    const user = await bookStoreApi.createUser();
    const token = await bookStoreApi.generateAndGetToken();
    await bookStoreApi.verifyAuthorizedUser();
    await bookStoreApi.getUser(user.userID, token);
    await bookStoreApi.deleteUser(user.userID, token);
  });
});
