require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const categoryRoutes = require("./routes/categoryRoutes");
const customerRoutes = require("./routes/customerRoutes");
const currencyRoutes = require("./routes/currencyRoutes");
// const uploadRoutes = require("./routes/uploadRoutes");
// const { userRouter } = require("./routes/userRoute");
const authApi = require("./routes/Auth.routes");
const adminAuthApi = require("./routes/AdminAuth.routes");

global.__basedir = __dirname;
const app = express();
const PORT = process.env.PORT || 5000;

// database connection
connection();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

//user routes 
app.use("/api/auth/",authApi);
//here is auth admin route
app.use("/api/auth-admin/",adminAuthApi);
//all router
// app.use("/api/users", userRouter);
app.use("/api/category", categoryRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/currency", currencyRoutes);

// app.use("/api/file", uploadRoutes);

// listening on port
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
