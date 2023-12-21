// import { Account } from "../types";

// export async function ensureAccount(recordId: string): Promise<Account> {
//   recordId = recordId.toLowerCase();
//   let entity = await Account.get(recordId);
//   if (!entity) {
//     entity = new Account(recordId);
//     await entity.save();
//   }
//   return entity;
// }
// account.ts

// account.ts

// import { Account as AccountType } from '../types';

// const accountStore: Record<string, AccountType> = {};

// export class Account extends AccountType {
//   static async get(id: string): Promise<AccountType | null> {
//     const account = accountStore[id];
//     return account || null;
//   }

//   async save(): Promise<void> {
//     accountStore[this.id] = this;
//   }
// }

// account.ts
import { Account as AccountType } from '../types';

const accountStore: Record<string, AccountType> = {};

export async function getAccount(id: string): Promise<AccountType | null> {
  const account = accountStore[id];
  return account || null;
}

export async function ensureAccount(recordId: string): Promise<AccountType> {
  recordId = recordId.toLowerCase(); // Assuming the IDs are case-insensitive
  let entity = await getAccount(recordId);

  if (!entity) {
    // Adjust this part based on the actual structure of your Account class
    entity = new AccountType({ id: recordId } as any); // Use 'as any' to bypass the type check
    accountStore[recordId] = entity; // Save the entity directly to the store
  }

  return entity;
}

export async function saveAccount(account: AccountType): Promise<void> {
  accountStore[account.id] = account;
}
