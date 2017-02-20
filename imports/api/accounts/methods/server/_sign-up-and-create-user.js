import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { createMasterProfileForUser } from './';

export const signUpAndCreateUser = (doc) => {
     if (Meteor.users.findOne({ 'emails.address': doc.email })) {
       throw new Meteor.Error('signUpAndCreateUserAndBusinessServer.emailExists', 'a user with this email address exists');
     } else {
       try {
           const {email, password} = doc;
           const userId = Accounts.createUser({email, password});
           if (userId) {

             try {
               const { name } = doc;
               const masterProfileCreationResult = createMasterProfileForUser({
                 userId,
                 name,
                 email
               });

               try {
                 Accounts.sendVerificationEmail(userId);
               } catch(error) {
                 console.log(`server.signUpAndCreateUserAndBusiness.sendVerificationEmailError :\n${error}\n`)
               }

               return 'OK';

             } catch (error) {
               console.log(`signUpAndCreateUserAndBusinessServer.createProfile \n${error}\n`);
               Meteor.users.remove(userId);
               throw new Meteor.Error('signUpAndCreateUserAndBusinessServer.createProfile', 'could not create user master profile and rolled back');

             }

           }
       } catch (error) {
         console.log(`signUpAndCreateUserAndBusinessServer.insertBusiness \n${error}\n`);
         throw new Meteor.Error('signUpAndCreateUserAndBusinessServer.insertBusiness', 'could not create business, so did not proceed with account creation');
       }
     }
};
