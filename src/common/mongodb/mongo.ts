//     ╭───────────────────────────────────────────╮
//     │             Copyright (c)                 │
//     │           ────────────────                │
//     │  Typical Meida Group, All Rights Reserved │
//     ╰───────────────────────────────────────────╯

//------------------------------------------------------------//

// Import the necessary module or declare it if not available.
import mongoose, { Document, Model, Schema } from 'mongoose';

//------------------------------------------------------------//

// Check if the MONGO_CONNECTION_URL environment variable is set, and throw an error if not.
// This ensures that the application will not start without the necessary database connection string.
const mongoConnectionUrl: string = process.env.MONGO_CONNECTION_URL ?? '';
if (mongoConnectionUrl.length < 1) {
    throw new Error('Environment variable MONGO_CONNECTION_URL was not properly set or is empty');
}

//------------------------------------------------------------//

// Initialize the mongoose connection with the connection URL.
// Connect to MongoDB using the mongoose connect method.
mongoose.connect(mongoConnectionUrl).catch(error => {
    console.error('Connection error:', error.message);
    process.exit(1); // Optionally exit process if cannot connect
});

//------------------------------------------------------------//

// Define the interface for a User document.
/**
 * Interface representing a user document in MongoDB.
 * @param username - Username of the user, required field.
 * @param email - Email address of the user, required field.
 * @param createdAt - The date when the user was created.
 * @param updatedAt - The date when the user information was last updated.
 */
interface IUser extends Document {
    username: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the schema for a User document using the Mongoose Schema constructor.
const UserSchema: Schema<IUser> = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Create a Mongoose model for the User based on the schema and interface.
const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

//------------------------------------------------------------//

// Export the Mongoose model and Mongoose connection for use elsewhere in the project.
export {
    UserModel,
    mongoose as mongooseConnection
};