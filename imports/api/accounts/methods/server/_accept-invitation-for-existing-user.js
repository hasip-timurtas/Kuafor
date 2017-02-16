import { Meteor } from 'meteor/meteor'
import { People } from '/imports/api/people/model'
import { USER_ROLE, ACCOUNT_STATUS, SETTING_PUBLIC, CHAT_CHANNEL_TYPE } from '/imports/environment/enums'
import { ChatChannels } from '/imports/api/chats/model'
import { toggleMemberInChatChannel } from '/imports/api/chats/methods'
import moment from 'moment-timezone'
import _ from 'underscore'

export const acceptInvitationForExistingUser = (personId, userId) => {
  const person = People.findOne({
    _id: personId,
    status: ACCOUNT_STATUS.PENDING,
    unusedInvitationSentAt: { $gt: moment().subtract(SETTING_PUBLIC.INVITATIONS_EXPIRE_IN_DAYS, 'days').toDate() }
  })

  if (!person) {
    throw new Meteor.Error('acceptInvitationForExistingUser.notFound', 'invitation not found')
  } else {
    const { name, contactEmails, timeZone, slug } = Meteor.users.masterProfile.findOne({ userId })

    const updateDoc = { name, contactEmails, timeZone, slug, userId, status: ACCOUNT_STATUS.ACTIVE }

    const updateDocKeys = Object.keys(updateDoc)
    const unsetDoc = { unusedInvitationSentAt: '' };

    ['organization',
      'avatarUrl',
      'birthDay',
      'contactEmails',
      'phones',
      'address',
      'siteLinks',
      'socialLinks'].filter(key => !_.contains(updateDocKeys, key))
      .forEach(key => Object.assign(unsetDoc, { [key]: '' }))

    People.update(personId, {
      $set: { ...updateDoc },
      $unset: { ...unsetDoc }
    }, { bypassCollection2: true })

    if (person.role === USER_ROLE.CONTRIBUTOR) {
      try {
        ChatChannels.find({
          businessId: person.businessId,
          type: CHAT_CHANNEL_TYPE.PUBLIC
        }).forEach((channel) => {
          toggleMemberInChatChannel.call({
            channelId: channel._id,
            memberId: personId
          })
        })
      } catch (e) {
        console.log(`Error occured while adding user to public chat channels during accept invitation for person ${personId}: `, e)
      }
    }

    return 'OK'
  }
}
