import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const GroupSchema = new Schema({
  owner: { type: String, required: true, unique: false }, // email
  name: { type: String, required: true, unique: true },
  members: [String]
});

async function findOrCreateUserGroup(email, UserGroupModel) {
  try {
    let userGroup = await UserGroupModel.findOne({ email: email });

    if (!userGroup) {
      userGroup = new UserGroupModel({ email: email });
      await userGroup.save();
      console.log('User group created:', userGroup);
    } else {
      console.log('User group found:', userGroup);
    }

    return userGroup;
  } catch (err) {
    console.error('Error finding or creating user group:', err);
    throw err;
  }
}

async function addMemberToGroup(group, user, UserGroupModel) {
  group.members.push(user.email);
  const userGroup = await findOrCreateUserGroup(user.email, UserGroupModel);
  // group.save(); // will save in parallel
  userGroup.groups.push(group.id);
  userGroup.save();
}

// TODO: add removeMember method
// function removeMemberFromGroup(user) {
  
// }

export { GroupSchema, addMemberToGroup };