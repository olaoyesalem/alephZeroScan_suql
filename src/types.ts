// Account type definition
export class Account {
  // Add properties relevant to the Account type
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

// Block type definition
export class Block {
  // Add properties relevant to the Block type
  id: string;
  number: bigint;
  hash: string;
  timestamp: Date;
  parentHash: string;
  specVersion: number;
  stateRoot: string;
  extrinsicsRoot: string;

  constructor(id: string, number: bigint, hash: string, timestamp: Date, parentHash: string, specVersion: number, stateRoot: string, extrinsicsRoot: string) {
    this.id = id;
    this.number = number;
    this.hash = hash;
    this.timestamp = timestamp;
    this.parentHash = parentHash;
    this.specVersion = specVersion;
    this.stateRoot = stateRoot;
    this.extrinsicsRoot = extrinsicsRoot;
  }
}

// Day type definition
export class Day {
  // Add properties relevant to the Day type
  id: string;
  year: number;
  month: number;
  date: number;
  extrinsics: number;
  events: number;
  transferCount: number;
  transferAmount: bigint;

  constructor(id: string, year: number, month: number, date: number, extrinsics: number, events: number, transferCount: number, transferAmount: bigint) {
    this.id = id;
    this.year = year;
    this.month = month;
    this.date = date;
    this.extrinsics = extrinsics;
    this.events = events;
    this.transferCount = transferCount;
    this.transferAmount = transferAmount;
  }
}

// Event type definition

  // // Add properties relevant to the Event type
  // id: string;
  // blockId: string;
  // blockNumber: bigint;
  // index: number;
  // section: string;
  // method: string;
  // extrinsicId?: string; // Optional extrinsic reference

  // constructor(id: string, blockId: string, blockNumber: bigint, index: number, section: string, method: string, extrinsicId?: string) {
  //   this.id = id;
  //   this.blockId = blockId;
  //   this.blockNumber = blockNumber;
  //   this.index = index;
  //   this.section = section;
  //   this.method = method;
  //   this.extrinsicId = extrinsicId;
  // }

  export interface Event {
    id: string;
    blockId: string;
    blockNumber: bigint;
    index: number;
    section?: string;
    method?: string;
    extrinsicId?: string;
  
    save(): Promise<void>;
  }
  


// Extrinsic type definition
export class Extrinsic {
  // Add properties relevant to the Extrinsic type
  id: string;
  blockId: string;
  blockNumber: bigint;
  index: number;
  hash: string;
 // signerId?: string; // Optional signer reference
  isSigned: boolean;
  section: string;
  method: string;
  success: boolean;

  constructor(id: string, blockId: string, blockNumber: bigint, index: number, hash: string, isSigned: boolean, section: string, method: string, success: boolean) {
    this.id = id;
    this.blockId = blockId;
    this.blockNumber = blockNumber;
    this.index = index;
    this.hash = hash;
    // this.signerId = signerId;
    this.isSigned = isSigned;
    this.section = section;
    this.method = method;
    this.success = success;
  }
}

// Transfer type definition
export class Transfer {
  id: string;
  fromId: string;
  toId: string;
  value: bigint;
  blockId: string;
  blockNumber: bigint;
  eventIndex: number;
  extrinsicIndex?: number; // Optional extrinsic reference

  constructor(id: string, fromId: string, toId: string, value: bigint, blockId: string, blockNumber: bigint, eventIndex: number, extrinsicIndex?: number) {
    this.id = id;
    this.fromId = fromId;
    this.toId = toId;
    this.value = value;
    this.blockId = blockId;
    this.blockNumber = blockNumber;
    this.eventIndex = eventIndex;
    this.extrinsicIndex = extrinsicIndex;
  }
}
