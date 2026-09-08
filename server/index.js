require("dotenv").config({ path: "./config/.env" });
require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const checkPayment = require("./controllers/checkPayment");

const paymentRouter = require("./routes/paymentRoute");
const adminRouts = require("./routes/adminRoutes");
const ownerRouts = require("./routes/ownerRoutes");
const commentRoutes = require("./routes/commentRoutes");
const houseRoutes = require("./routes/houseRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const rentRoutes = require("./routes/rentRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerOptions = require("./swaggerOptions");

if (!process.env.DB_URL || !process.env.SECRET) {
  console.error("Missing required environment variables: DB_URL and SECRET");
  process.exit(1);
}

mongoose.set("sanitizeFilter", true);

const app = express();
app.disable("x-powered-by");
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(helmet());
app.use(express.json({ limit: "2mb" }));

const allowedOrigins = (
  process.env.CLIENT_ORIGIN ||
  "http://localhost:3000,https://all-in-one-rental.netlify.app"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
  })
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(apiLimiter);
app.use("/owner/login", authLimiter);
app.use("/owner/register", authLimiter);
app.use("/owner/reset", authLimiter);
app.use("/tenant/login", authLimiter);
app.use("/tenant/register", authLimiter);
app.use("/tenant/reset", authLimiter);
app.use("/admin/login", authLimiter);
app.use("/admin/reset", authLimiter);

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

if (process.env.NODE_ENV !== "production") {
  const swaggerDocs = swaggerJSDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

app.use("/payment", paymentRouter);
app.use("/admin", adminRouts);
app.use("/owner", ownerRouts);
app.use("/comment", commentRoutes);
app.use("/houses", houseRoutes);
app.use("/tenant", tenantRoutes);
app.use("/maintenance", maintenanceRoutes);
app.use("/rent", rentRoutes);
app.use("/application", applicationRoutes);

checkPayment.updateExpiredPayments();

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? "Server error" : err.message,
  });
});

const port = Number(process.env.PORT) || 4000;
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("listening to port", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
