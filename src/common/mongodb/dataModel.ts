//     ╭───────────────────────────────────────────╮
//     │             Copyright (c)                 │
//     │           ────────────────                │
//     │  Typical Meida Group, All Rights Reserved │
//     ╰───────────────────────────────────────────╯

//------------------------------------------------------------//

import { UserModel } from './mongo';  // Import the UserModel from your MongoDB model definitions.

/**
 * Creates a new user in the database.
 * @param username - The username for the new user.
 * @param email - The email address for the new user.
 * @returns A promise that resolves with no value, handles creation logic and error.
 */
async function createUser(username: string, email: string): Promise<void> {
    try {
        const newUser = new UserModel({ username, email });
        await newUser.save();
        console.log('User created:', newUser);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

/**
 * Fetches a user by username.
 * @param username - The username of the user to find.
 * @returns A promise that resolves with no value, handles fetch logic and error.
 */
async function findUserByUsername(username: string): Promise<void> {
    try {
        const user = await UserModel.findOne({ username: username });
        console.log('User found:', user);
    } catch (error) {
        console.error('Error finding user:', error);
    }
}

// Export the functions to make them available for import in other parts of your application.
export {
    createUser,
    findUserByUsername
};
