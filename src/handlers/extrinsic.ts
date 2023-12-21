// extrinsic.ts

import { SubstrateExtrinsic } from "@subql/types";
import { Extrinsic } from "../types";
import { ensureBlock } from "./block";
import { ensureAccount } from "./account";
import { addExtrinsicToDay } from "./day";

export async function ensureExtrinsic(
  extrinsic: SubstrateExtrinsic
): Promise<Extrinsic> {
  const block = await ensureBlock(
    extrinsic.block.block.header.number.toString()
  );
  const index = extrinsic.idx;
  const recordId = `${block.id}-${index}`;
  const hash = extrinsic.extrinsic.hash.toString();
  let entity = await Extrinsic.get(recordId);
  if (!entity) {
    entity = new Extrinsic(
      recordId,
      block.id,
      block.number,
      index,
      hash,
      extrinsic.extrinsic.isSigned,
      extrinsic.extrinsic.method.section,
      extrinsic.extrinsic.method.method,
      extrinsic.success
    );
    await entity.save(); // Assuming save is implemented
  }

  return entity;
}

export async function createExtrinsic(
  extrinsic: SubstrateExtrinsic
): Promise<void> {
  const entity = await ensureExtrinsic(extrinsic);
  const isSigned = extrinsic.extrinsic.isSigned;
  if (isSigned) {
    const signerAccount = extrinsic.extrinsic.signer.toString();
    const signer = await ensureAccount(signerAccount);
    entity.signerId = signer.id;
  }
  entity.isSigned = isSigned;
  entity.section = extrinsic.extrinsic.method.section;
  entity.method = extrinsic.extrinsic.method.method;
  entity.success = extrinsic.success;
  await entity.save(); // Assuming save is implemented
  await addExtrinsicToDay(extrinsic.block.timestamp);
}
