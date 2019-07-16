const request = require("supertest");
const fs = require("fs");

describe("/api/csv", () => {
  let server;

  beforeEach(() => {
    server = require("../index");
  });

  afterEach(async () => {
    await server.close();
  });

  describe("GET", () => {
    it("return json array from file", async () => {
      const res = await request(server).get("/api/csv/get");
      expect(res.status).toBe(200);
    });
  });

  describe("GET", () => {
    it("return file dont exist", async () => {
      fs.rename(
        "./tmpy/test-data_json.txt",
        "./tmpy/test-data_json2.txt",
        function(err) {
          if (err) console.log("ERROR: " + err);
        }
      );
      const res = await request(server).get("/api/csv/get");
      expect(res.status).toBe(404);
      fs.rename(
        "./tmpy/test-data_json2.txt",
        "./tmpy/test-data_json.txt",
        function(err) {
          if (err) console.log("ERROR: " + err);
        }
      );
    });
  });

  describe("POST", () => {
    it("return 500 when POST have no file", async () => {
      const res = await request(server).post("/api/csv/upload");
      expect(res.status).toBe(500);
    });
  });

  describe("POST", () => {
    it("return is not csv file", async () => {
      const res = await request(server)
        .post("/api/csv/upload")
        .attach("text", "./tmpy/data_json.txt");
      expect(res.status).toBe(500);
    });
  });
});
