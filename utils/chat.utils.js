const { Messages } = require("../models/Chat");

exports.updateMessageSeenStatus = async (from ,to) => {
    try {
        const updatedMessage = await Messages.updateMany(
            {
              $and: [
                {
                  users: {
                    $all: [from, to],
                  },
                },
                { isSeen: false },
              ],
            },
          { $set: { isSeen: true } }
          );
          return true;
    } catch (ex) {
      return false;
    }
  };

exports.unSeenCountNumber = async (userID) => {
  try {
    // const userID = req.user.id; // accept userID as parameter
    var allFriends = [];

    if (!userID) {
      return res.status(404).send({ message: "No Chat History" });
    }
    const messages = await Messages.find(
      {
        users: {
          $in: [userID],
        },
      },
      { users: 1 },
      { _id: 0 }
    );
    messages.map((msg) => {
      const users = msg.users;
      users.map((user) => {
        allFriends.push(user);
      });
      return allFriends;
    });
    let uniqueUserID = allFriends.filter(
      (value, index, self) => self.indexOf(value) === index
    );
    uniqueUserID = uniqueUserID.filter((num) => num != userID);

    const unseenMessageCount = await Messages.find({
      $and: [
        {
          users: {
            $in: [userID],
          },
        },
        { isSeen: false },
        { sender: { $ne: userID } },
      ],
    }).count();
    // res.json({ unseenMessageCount });
    return unseenMessageCount;
  } catch (ex) {
    next(ex);
  }
};
