import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index";

migrate(db, { migrationsFolder: "drizzle" });
