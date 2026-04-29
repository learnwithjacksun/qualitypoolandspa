import express from "express";
import cors from "cors";
import process from "process";
import connectDB from "./config/database.js";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";

await connectDB();

const PORT = process.env.PORT || 5000;

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "https://qualitypoolandspa.vercel.app",
  "https://qualitypoolandspa-admin.vercel.app",
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true , limit: "100mb" }));



app.get("/", (req, res) => {
    res.json({
        message: "Quality Pool & Spa API",
        version: "1.0.0",
        status: "success",
    });
});

// routes
app.use("/auth", authRouter);
app.use("/products", productRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});