import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { People } from '/imports/api/people/model';
import { ACCOUNT_STATUS, USER_ROLE, SETTING_PUBLIC, CHAT_CHANNEL_TYPE } from '/imports/environment/enums';
import { ChatChannels } from '/imports/api/chats/model';
import { toggleMemberInChatChannel } from '/imports/api/chats/methods';
import moment from 'moment-timezone';

export const acceptInvitation = (invitation) => {
  const { personId, name, timeZone, password } = invitation;
  const person = People.findOne({
    _id: personId,
    status: ACCOUNT_STATUS.PENDING,
    unusedInvitationSentAt: {$gt: moment().subtract(SETTING_PUBLIC.INVITATIONS_EXPIRE_IN_DAYS, 'days').toDate()}
  });

  if (!personId) {
    throw new Meteor.Error('acceptInvitation.notFound', 'invitation not found');
  } else {
    const businessId = person.businessId
    person.name = name;
    person.timeZone = timeZone;
    delete person.createdAt;
    delete person.businessId;
    delete person.status;
    delete person.role;
    delete person.tags;

    const email = person.contactEmails[0].address;

    if (Meteor.users.findOne({ businessId: businessId, 'emails.address': email })) {
      throw new Meteor.Error('acceptInvitation.emailExists', 'a user with this email address in this business exists, please log in fist to accept this invitation');
    } else {

      const userAlreadyExists = Meteor.users.findOne({ 'emails.address': email })

      const userId = userAlreadyExists ? userAlreadyExists._id : Accounts.createUser({email, password});

      if (userId) {

        try {

          Meteor.users.update(userId, {$set: {'emails.0.verified': true}});

          if (!userAlreadyExists) {
            Meteor.users.masterProfile.insert({
              ...person,
              userId,
            });
          }

          try {

            People.update(personId, {
              $set: {
                userId,
                name: person.name,
                timeZone: person.timeZone,
                status: ACCOUNT_STATUS.ACTIVE,
              },
              $unset: { unusedInvitationSentAt: '' }
            });

            if ( People.findOne(personId).role === USER_ROLE.CONTRIBUTOR ) {
              try {
                ChatChannels.find({
                  businessId: person.businessId,
                  type: CHAT_CHANNEL_TYPE.PUBLIC,
                }).forEach( channel => {
                  toggleMemberInChatChannel.call({
                    channelId: channel._id,
                    memberId: personId,
                  })
                });
              } catch(e) {
                console.log(`Error occured while adding user to public chat channels during accept invitation for person ${personId}: `, e)
              }
            }

            return 'OK';

          } catch (error) {

            Meteor.users.masterProfile.remove({userId});
            console.log(`Error in associating user master profile for personId ${personId} with business profile on invitation: ${error}`)
            throw new Meteor.Error('acceptInvitation.createProfile', 'could not create update business profile and rolled back');

          }


        } catch (error) {

          Meteor.users.remove(userId);
          console.log(`Error in creating user master profile for personId ${personId} on invitation: ${error}`)
          throw new Meteor.Error('acceptInvitation.createProfile', 'could not create user master profile and rolled back');

        }

      }

    }
  }

};
