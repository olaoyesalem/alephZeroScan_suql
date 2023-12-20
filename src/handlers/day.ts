// import { Day } from "../types";

// export async function ensureDay(timestamp: Date): Promise<Day> {
//   const recordId = timestamp.toISOString().slice(0, 10);
//   let entity = await Day.get(recordId);
//   if (!entity) {
//     entity = Day.create({
//       id: recordId,
//       year: timestamp.getFullYear(),
//       month: timestamp.getMonth(),
//       date: timestamp.getDate(),
//       extrinsics: 0,
//       events: 0,
//       transferCount: 0,
//       transferAmount: BigInt(0)
//     });
//     await entity.save();
//   }
//   return entity;
// }

// export async function addExtrinsicToDay(timestamp: Date): Promise<void> {
//   const day = await ensureDay(timestamp);
//   day.extrinsics += 1;
//   await day.save();
// }

// export async function addEventToDay(timestamp: Date): Promise<void> {
//   const day = await ensureDay(timestamp);
//   day.events += 1;
//   await day.save();
// }

// export async function addTransferToDay(timestamp: Date, value: bigint): Promise<void> {
//   const day = await ensureDay(timestamp);
//   day.transferCount += 1;
//   day.transferAmount += value;
//   await day.save();
// }

import { Day as DayType } from "../types";

// In-memory storage for demonstration purposes
const dayStorage: Map<string, DayType> = new Map();

export class Day extends DayType {
  // Define 'id' as a property
  id: string;

  constructor(data: {
    id: string;
    year: number;
    month: number;
    date: number;
    extrinsics: number;
    events: number;
    transferCount: number;
    transferAmount: bigint;
  }) {
    // Call the constructor of the base class
    super(data.id, data.year, data.month, data.date, data.extrinsics, data.events, data.transferCount, data.transferAmount);

    // Set 'id' property
    this.id = data.id;
  }

  async save(): Promise<void> {
    // Implement the logic to save the 'Day' entity to storage
    dayStorage.set(this.id, { ...this });
    console.log(`Day with ID ${this.id} saved to storage.`);
    return Promise.resolve();
  }

  static async saveDay(entity: DayType): Promise<void> {
    // Save the 'Day' entity to storage
    dayStorage.set(entity.id, { ...entity });
    console.log(`Day with ID ${entity.id} saved to storage.`);
  }

  static async get(id: string): Promise<DayType | null> {
    return dayStorage.get(id) || null;
  }

  static create(data: {
    id: string;
    year: number;
    month: number;
    date: number;
    extrinsics: number;
    events: number;
    transferCount: number;
    transferAmount: bigint;
  }): DayType {
    // Create a new instance of 'Day' with the provided data
    const entity = new Day(data);
    dayStorage.set(entity.id, entity);
    return entity;
  }

  async addExtrinsic(): Promise<void> {
    this.extrinsics += 1;
    await this.save();
  }

  async addEvent(): Promise<void> {
    this.events += 1;
    await this.save();
  }

  async addTransfer(value: bigint): Promise<void> {
    this.transferCount += 1;
    this.transferAmount += value;
    await this.save();
  }
}

// Ensure Day function
export async function ensureDay(timestamp: Date): Promise<DayType> {
  const recordId = timestamp.toISOString().slice(0, 10);
  let entity = await Day.get(recordId);
  if (!entity) {
    entity = Day.create({
      id: recordId,
      year: timestamp.getFullYear(),
      month: timestamp.getMonth(),
      date: timestamp.getDate(),
      extrinsics: 0,
      events: 0,
      transferCount: 0,
      transferAmount: BigInt(0),
    });
    await Day.saveDay(entity);
  }
  return entity;
}

// Add extrinsic to Day function
export async function addExtrinsicToDay(timestamp: Date): Promise<void> {
  const day = await ensureDay(timestamp);
//  await day.addExtrinsic();
}

// Add transfer to Day function
export async function addTransferToDay(timestamp: Date, value: bigint): Promise<void> {
  const day = await ensureDay(timestamp);
  //await day.addTransfer(value);
}

// Add event to Day function
export async function addEventToDay(timestamp: Date): Promise<void> {
  const day = await ensureDay(timestamp);
  //await day.addEvent();
}
