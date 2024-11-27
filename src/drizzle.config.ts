import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({    
    path: ".env"
});

export default defineConfig({
    schema: "./drizzel/schema.ts",
    out: "./drizzel/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
    }
});