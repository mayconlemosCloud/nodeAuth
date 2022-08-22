import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
            type: "postgres",
            host: "ec2-100-25-72-111.compute-1.amazonaws.com",
            port: 5432,
            username: "dxgerfcrjrwiew",
            password: "3ea47a9101db1ec89aeb25b26c58f082a3775199cbe3feb67bcce30c424d6f81",
            database: "d6mu5pjnvhmt3t",
            entities: ["build/database/entities/**/*.js"],
            synchronize: true,
            logging: false,
            extra: {
             ssl: {
                 rejectUnauthorized: false,
             }
        }

        })

 AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
