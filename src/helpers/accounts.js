import { sendError } from "./errors";

export const getAccountsSubProperty = (query) => {
  let accounts = [];
  query?.forEach(async (doc) => {
    const accountDoc = doc.data();

    // Get owner object
    await accountDoc.owner
      .get()
      .then((docOwner) => {
        accountDoc.owner = docOwner.data();
      })
      .catch((err) => {
        sendError(err);
      });

    // Get members objects
    const membersPromise = [];
    accountDoc.members?.forEach((member) => {
      if (member.get) {
        membersPromise.push(
          new Promise((resolve) => {
            member
              .get()
              .then((docMember) => {
                resolve(docMember.data());
              })
              .catch((err) => {
                sendError(err);
              });
          })
        );
      }
    });

    Promise.all(membersPromise)
      .then((members) => {
        accountDoc.members = members;
      })
      .then(() => {
        accounts.push({ ...accountDoc, id: doc.id });
      })
      .catch((err) => {
        sendError(err);
      });
  });

  return accounts;
};
