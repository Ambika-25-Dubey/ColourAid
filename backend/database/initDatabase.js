import { fileURLToPath } from "url";
import path from "path";
import db from "./connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeDatabase() {
  try {
    const hasUsers = await db.schema.hasTable("users");
    if (!hasUsers) {
      await db.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("uuid").unique().notNullable();
        table.string("name").notNullable();
        table.string("email").unique().notNullable();
        table.string("password_hash").notNullable();
        table.boolean("is_admin").defaultTo(false);
        table.timestamp("created_at").defaultTo(db.fn.now());
        table.timestamp("updated_at").defaultTo(db.fn.now());
      });
    }

    const hasAssessments = await db.schema.hasTable("assessments");
    if (!hasAssessments) {
      await db.schema.createTable("assessments", (table) => {
        table.increments("id").primary();
        table.integer("user_id").unsigned().notNullable();
        table.string("test_type").notNullable();
        table.float("score");
        table.string("severity");
        table.json("result_data");
        table.timestamp("created_at").defaultTo(db.fn.now());
        table.timestamp("updated_at").defaultTo(db.fn.now());
        table
          .foreign("user_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
      });
    }

    const hasImageUploads = await db.schema.hasTable("image_uploads");
    if (!hasImageUploads) {
      await db.schema.createTable("image_uploads", (table) => {
        table.increments("id").primary();
        table.integer("user_id").unsigned().notNullable();
        table.string("original_filename").notNullable();
        table.string("stored_filename").notNullable();
        table.string("mime_type").notNullable();
        table.string("original_path").notNullable();
        table.string("processed_path");
        table.timestamp("created_at").defaultTo(db.fn.now());
        table.timestamp("updated_at").defaultTo(db.fn.now());
        table
          .foreign("user_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
      });
    }

    console.log("Database schema initialized successfully.");
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

if (fileURLToPath(import.meta.url) === fileURLToPath(new URL(`file://${process.argv[1]}`))) {
  initializeDatabase();
}

export default initializeDatabase;
