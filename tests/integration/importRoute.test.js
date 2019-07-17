const request = require("supertest");
const fs = require("fs");

describe("/api/csv", () => {
  let server;

  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(async () => {
    await server.close();
  });

  describe("GET /api/csv/get", () => {
    it("return json array from file", async () => {
      const res = await request(server).get("/api/csv/get");
      expect(res.status).toBe(200);
    });
  });

  describe("GET /api/csv/get", () => {
    it("return file dont exist", async () => {
      fs.rename(
        "./tmpy/test-data_json.txt",
        "./tmpy/test-data_json2.txt",
        function(err) {
          if (err) console.log(err);
        }
      );
      const res = await request(server).get("/api/csv/get");
      expect(res.status).toBe(404);
      fs.rename(
        "./tmpy/test-data_json2.txt",
        "./tmpy/test-data_json.txt",
        function(err) {
          if (err) console.log(err);
        }
      );
    });
  });

  describe("POST /api/csv/upload", () => {
    it("return 500 when POST have no file", async () => {
      const res = await request(server).post("/api/csv/upload");
      expect(res.status).toBe(500);
    });
  });

  describe("POST /api/csv/upload", () => {
    it("return is not csv file", async () => {
      const res = await request(server)
        .post("/api/csv/upload")
        .attach("csv", "./tmpy/data_json.txt");
      expect(res.status).toBe(500);
    });
  });

  describe("GET /api/csv/db", () => {
    it("return 404 if file not found", async () => {
      fs.rename(
        "./tmpy/test-data_json.txt",
        "./tmpy/test-data_json2.txt",
        function(err) {
          if (err) console.log(err);
        }
      );

      const res = await request(server).post("/api/csv/db");
      expect(res.status).toBe(404);

      fs.rename(
        "./tmpy/test-data_json2.txt",
        "./tmpy/test-data_json.txt",
        function(err) {
          if (err) console.log(err);
        }
      );
    });
  });

  describe("GET /api/csv/db", () => {
    it("return 200 DB add data", async () => {
      const res = await request(server).get("/api/csv/db");
      expect(res.status).toBe(200);
    });
  });
});
