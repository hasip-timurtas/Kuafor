import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { checkDomainAvailability } from '/imports/api/businesses/methods';
import { Businesses } from '/imports/api/businesses/model';
import { createDefaultProjectCustomStatuses } from '/imports/api/projects/methods';
import { createMasterProfileForUserAndBusinessCreation } from './';

export const signUpAndCreateUserAndBusiness = (doc) => {
   if (checkDomainAvailability.call({domain: doc.business.domain}) === 'OK') {

     if (Meteor.users.findOne({ 'emails.address': doc.email })) {
       throw new Meteor.Error('signUpAndCreateUserAndBusinessServer.emailExists', 'a user with this email address exists');
     } else {

       const {name, domain} = doc.business;

       try {
         const businessId = Businesses.insert({name, domain});

         try {

           const {email, password} = doc;
           const userId = Accounts.createUser({email, password});

           if (userId) {

             try {
               const { name, timeZone } = doc;
               const masterProfileCreationResult = createMasterProfileForUserAndBusinessCreation({
                 userId,
                 businessId,
                 name,
                 email,
                 timeZone,
               });

               try {
                 Accounts.sendVerificationEmail(userId);
               } catch(error) {
                 console.log(`server.signUpAndCreateUserAndBusiness.sendVerificationEmailError :\n${error}\n`)
               }

               createDefaultProjectCustomStatuses.call({ businessId }, (error, result) => {
                 if (error) {
                   throw new Meteor.Error('projects.createDefaultProjectCustomStatuses', 'Server was not able to create default project statuses')
                 }
                 console.log(`Default project statuses for ${businessId} just created...`)
                 return 'OK';
               });

               return masterProfileCreationResult;

             } catch (error) {

               console.log(`signUpAndCreateUserAndBusinessServer.createProfile \n${error}\n`);
               Businesses.remove(businessId);
               Meteor.users.remove(userId);
               throw new Meteor.Error('signUpAndCreateUserAndBusinessServer.createProfile', 'could not create user master profile and rolled back');

             }

           }

         } catch (error) {

           console.log(`signUpAndCreateUserAndBusinessServer.createAccount \n${error}\n`);
           Businesses.remove(businessId);
           throw new Meteor.Error('signUpAndCreateUserAndBusinessServer.createAcount', 'could not create user account and rolled back');

         }

       } catch (error) {
         console.log(`signUpAndCreateUserAndBusinessServer.insertBusiness \n${error}\n`);
         throw new Meteor.Error('signUpAndCreateUserAndBusinessServer.insertBusiness', 'could not create business, so did not proceed with account creation');
       }
     }
   }
};
