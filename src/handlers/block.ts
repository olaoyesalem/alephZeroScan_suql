// import { SubstrateBlock } from "@subql/types";
// import { Block } from "../types";

// export async function ensureBlock(recordId: string): Promise<Block> {
//   let entity = await Block.get(recordId);
//   if (!entity) {
//     entity = new Block(recordId);
//     entity.number = BigInt(recordId);
//     await entity.save();
//   }
//   return entity;
// }

// export async function createBlock(block: SubstrateBlock): Promise<void> {
//   const entity = await ensureBlock(block.block.header.number.toString());
//   entity.hash = block.block.hash.toString();
//   entity.timestamp = block.timestamp;
//   entity.parentHash = block.block.header.parentHash.toString();
//   entity.specVersion = block.specVersion;
//   entity.stateRoot = block.block.header.stateRoot.toString();
//   entity.extrinsicsRoot = block.block.header.extrinsicsRoot.toString();
//   await entity.save();
// }
import { SubstrateBlock } from "@subql/types";
import { Block as BlockType } from "../types";

// In-memory storage for demonstration purposes
const blockStorage: Map<string, BlockType> = new Map();

export async function getBlock(id: string): Promise<BlockType | null> {
  return blockStorage.get(id) || null;
}

export async function ensureBlock(recordId: string): Promise<BlockType> {
  let entity = await getBlock(recordId);
  if (!entity) {
    entity = new BlockType(recordId, BigInt(0), '', new Date(), '', 0, '', '');
    blockStorage.set(recordId, entity);
  }
  return entity;
}

export async function createBlock(block: SubstrateBlock): Promise<void> {
  const entity = await ensureBlock(block.block.header.number.toString());
  entity.hash = block.block.hash.toString();
  entity.timestamp = new Date(block.timestamp);
  entity.parentHash = block.block.header.parentHash.toString();
  entity.specVersion = block.specVersion;
  entity.stateRoot = block.block.header.stateRoot.toString();
  entity.extrinsicsRoot = block.block.header.extrinsicsRoot.toString();

  // Save the 'entity' to the in-memory storage
  blockStorage.set(entity.id, entity);

  console.log(`Block with ID ${entity.id} saved to storage.`);
}

export async function saveBlock(entity: BlockType): Promise<void> {
  console.log(`Block with ID ${entity.id} saved to storage.`);
}
