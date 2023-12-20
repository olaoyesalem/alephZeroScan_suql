// import { SubstrateEvent } from "@subql/types";
// import { Event } from "../types";
// import { ensureBlock } from "./block";
// import { addEventToDay } from "./day";
// import { ensureExtrinsic } from "./extrinsic";
// import { createTransfer } from "./transfer";

// export async function ensureEvent(event: SubstrateEvent): Promise<Event> {
//   const block = await ensureBlock(event.block.block.header.number.toString());
//   const idx = event.idx;
//   const recordId = `${block.id}-${idx}`;
//   let entity = await Event.get(recordId);
//   if (!entity) {
//     entity = Event.create({
//       id: recordId,
//       blockId: block.id,
//       blockNumber: block.number,
//       index: idx,
//     });
//     await entity.save();
//   }
//   return entity;
// }

// export async function createEvent(event: SubstrateEvent): Promise<void> {
//   const entity = await ensureEvent(event);
//   entity.section = event.event.section;
//   entity.method = event.event.method;
//   if (event.extrinsic) {
//     const extrinsic = await ensureExtrinsic(event.extrinsic);
//     entity.extrinsicId = extrinsic.id;
//   }
//   await entity.save();
//   await addEventToDay(event.block.timestamp);

//   if (event.event.section==="balances" && event.event.method==="Transfer") {
//     createTransfer(event)
//   }
// }

// types.ts (or wherever your Event type is defined)

// event.ts
import { SubstrateEvent } from "@subql/types";
import { Event as EventType } from "../types"; // Import EventType from your types file
import { ensureBlock } from "./block";
import { addEventToDay } from "./day";
import { ensureExtrinsic } from "./extrinsic";
import { createTransfer } from "./transfer";

const eventStorage: Map<string, EventType> = new Map();

export class Event implements EventType {
  id: string;
  blockId: string;
  blockNumber: bigint;
  index: number;
  section?: string;
  method?: string;
  extrinsicId?: string;

  constructor(data: {
    id: string;
    blockId: string;
    blockNumber: bigint;
    index: number;
    section?: string;
    method?: string;
    extrinsicId?: string;
  }) {
    this.id = data.id;
    this.blockId = data.blockId;
    this.blockNumber = data.blockNumber;
    this.index = data.index;
    this.section = data.section;
    this.method = data.method;
    this.extrinsicId = data.extrinsicId;
  }

  async save(): Promise<void> {
    eventStorage.set(this.id, { ...this });
    console.log(`Event with ID ${this.id} saved to storage.`);
  }

  static async get(id: string): Promise<EventType | null> {
    return eventStorage.get(id) || null;
  }

  static async create(data: {
    id: string;
    blockId: string;
    blockNumber: bigint;
    index: number;
    section?: string;
    method?: string;
    extrinsicId?: string;
  }): Promise<EventType> {
    const entity = new Event(data);
    await entity.save();
    console.log(`Event with ID ${entity.id} created.`);
    return entity;
  }
}

export async function ensureEvent(event: SubstrateEvent): Promise<EventType> {
  const block = await ensureBlock(event.block.block.header.number.toString());
  const idx = event.idx;
  const recordId = `${block.id}-${idx}`;
  let entity = await Event.get(recordId);
  if (!entity) {
    entity = await Event.create({
      id: recordId,
      blockId: block.id,
      blockNumber: BigInt(block.number),
      index: idx,
    });
  }
  return entity;
}

export async function createEvent(event: SubstrateEvent): Promise<void> {
  const entity = await ensureEvent(event);
  entity.section = event.event.section;
  entity.method = event.event.method;
  if (event.extrinsic) {
    const extrinsic = await ensureExtrinsic(event.extrinsic);
    entity.extrinsicId = extrinsic.id;
  }
  await entity.save();
  await addEventToDay(event.block.timestamp);

  if (event.event.section === "balances" && event.event.method === "Transfer") {
    createTransfer(event);
  }
}
