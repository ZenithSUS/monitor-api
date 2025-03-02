export const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  console.log(
    "Time: ",
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  if(req.body !== null || req.body !== undefined) console.log("Body: ", req.body);
  console.log(`Middleware status: ${res.statusCode} \n`);
  next();
};
