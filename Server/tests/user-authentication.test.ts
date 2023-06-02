import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/app";
import { MockDB, mockDB } from "./mock";
import { loginUser } from "./support/utils";

describe("Authenticating a user (POST)", () => {
  let db: MockDB;

  beforeEach(async () => {
    db = await mockDB();
  });

  it("should be possible to login as a user (200)", async () => {
    const response = await loginUser(request(app));

    // Assert response is correct
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.headers["set-cookie"]).toBeDefined();
    expect(response.body._id).toBeDefined();
    expect(response.body.username).toBe("test");
    expect(response.body.password).toBeUndefined();
    expect(response.body.isAdmin).toBe(false);
  });

  it("should be possible to logout (200)", async () => {
    const agent = request.agent(app);
    await loginUser(agent);
    const response = await agent.post("/api/users/logout");

    // Assert response is correct
    expect(response.status).toBe(204);
    expect(response.headers["content-type"]).toBeUndefined;
    expect(response.headers["set-cookie"]).toBeDefined();
  });
});
