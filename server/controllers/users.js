import User from "../models/User.js";

export const getuser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get user's friends and populate with specific fields
export const getUserFriends = async (req, res) => {
  try {
    // Assuming you have the user's ID from the request
    const { id } = req.params;

    // Find the user by ID and populate the 'friends' field with specific fields
    const user = await User.findById(id).populate(
      "friends",
      "firstName lastName image"
    );

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract the populated friends
    const userFriends = user.friends;

    // Return the user's friends
    res.status(200).json(userFriends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    // Find the user and friend
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // Use $addToSet and $pull for both user and friend
    user.friends.includes(friendId)
      ? user.friends.pull(friendId)
      : user.friends.addToSet(friendId);
    friend.friends.includes(id)
      ? friend.friends.pull(id)
      : friend.friends.addToSet(id);

    // Mark the arrays as modified
    user.markModified("friends");
    friend.markModified("friends");

    // Save both documents
    await user.save();
    await friend.save();

    // Retrieve the updated user and populate friends with firstName, lastName, and image
    const updatedUser = await User.findById(id).populate(
      "friends",
      "firstName lastName image"
    );

    res.status(200).json(updatedUser.friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
