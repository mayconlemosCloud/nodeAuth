import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
            type: "postgres",
            host: "ec2-hide.compute-1.amazonaws.com",
            port: 5432,
            username: "hide",
            password: "hide",
            database: "hide",
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
