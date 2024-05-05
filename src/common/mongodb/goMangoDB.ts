//     ╭───────────────────────────────────────────╮
//     │             Copyright (c)                 │
//     │           ────────────────                │
//     │  Typical Meida Group, All Rights Reserved │
//     ╰───────────────────────────────────────────╯

//------------------------------------------------------------//

// Type declarations for the go-mongo-db module if they are not provided.
// This module declaration helps integrate the go-mongo-db library into TypeScript projects,
// by providing basic type information that describes the class and its methods.

declare module 'go-mongo-db' {
    /**
     * Represents a MongoDB client with methods for interacting with the database.
     */
    export class GoMongoDb {
        /**
         * Creates an instance of the MongoDB client using a connection string.
         * 
         * @param connectionString - The MongoDB connection URI string.
         */
        constructor(connectionString: string);

        /**
         * Method to connect to the database.
         * This method might typically return a Promise that resolves when the connection is successfully established,
         * or rejects with an error if the connection fails.
         */
        connect(): Promise<void>;

        /**
         * Example method to close the connection to the database.
         * This method might typically return a Promise that resolves when the connection is successfully closed,
         * or rejects with an error if there is a problem closing the connection.
         */
        close(): Promise<void>;

        // Add any additional methods or properties as needed, based on the actual usage of the module.
    }
}
