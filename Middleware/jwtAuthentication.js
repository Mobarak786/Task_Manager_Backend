import jwt from "jsonwebtoken";

export const jwtAuth = (req, res, next) => {
  //getting the token  stored in cookies
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).send("user not authenticated");
  }
  //deceoding the token data
  jwt.verify(token, "abht57fbfbfbngj5984rncghht4", (err, payload) => {
    if (err) {
      return res.status(403).send("invalid token");
    }
    req.userId = payload.id;
    //req.name = payload.name;
    next();
  });
};
