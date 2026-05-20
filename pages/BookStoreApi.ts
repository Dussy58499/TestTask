import test, { APIRequestContext, expect } from "@playwright/test";
import { userData } from "../helper/testData";

export default class BookStoreApi {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  //Actions
  async createUser() {
    return await test.step("Create User", async () => {
      const response = await this.request.post("/Account/v1/User", {
        data: userData,
      });
      expect(response.status()).toBe(201);
      const body = await response.json();
      return body;
    });
  }

  async generateAndGetToken() {
    return await test.step("Generate Token", async () => {
      const response = await this.request.post("/Account/v1/GenerateToken", {
        data: userData,
      });
      expect(response.status()).toBe(200);

      const body = await response.json();
      return body.token;
    });
  }

  async getUser(userId: string, token: any) {
    await test.step("Get User", async () => {
      const response = await this.request.get(`/Account/v1/User/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(response.status()).toBe(200);
    });
  }

  async deleteUser(userId: string, token: string) {
    await test.step("Delete User", async () => {
      const response = await this.request.delete(`/Account/v1/User/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //Response from deletetion is 204, no sure how to get 200 as in documentation.
      expect(response.status()).toBe(204);
    });
  }

  //Verification
  async verifyAuthorizedUser() {
    await test.step("Authorize User", async () => {
      const response = await this.request.post("/Account/v1/Authorized", {
        data: userData,
      });
      expect(response.status()).toBe(200);
      expect(await response.json()).toBe(true);
    });
  }
}
