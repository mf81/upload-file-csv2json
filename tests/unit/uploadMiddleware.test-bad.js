const upload = require("../../middleWare/uploadMiddleware");

describe("auth middleware", () => {
  let server;
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await server.close();
  });
  it("empty headers", () => {
    const req = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    const res = {};
    const next = jest.fn();

    upload(req, res, next);
    expect(res.status).toBe(404);
  });
});

// describe("auth middleware", () => {
//   it("populate req.user witch the payload of valid JWT", () => {
//     const user = {
//       _id: mongoose.Types.ObjectId().toHexString(),
//       isAdmin: true
//     };
//     const token = new Users(user).generateAuthToken();
//     const req = {
//       header: jest.fn().mockReturnValue(token)
//     };
//     const res = {};
//     const next = jest.fn();

//     auth(req, res, next);
//     expect(req.user).toBeDefined();
//   });
// });
