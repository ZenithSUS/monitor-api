export const logger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
    );
    console.log(
      "Time: ",
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
    if (req.body && Object.keys(req.body).length > 0) {
      console.log("Body: ", req.body);
    }
    console.log(`Middleware status: ${res.statusCode < 400 ? 'OK' : 'Not Ok'}`);
    console.log(`Response time: ${duration}ms \n`);
  });
  next();
};
