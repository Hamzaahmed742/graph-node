import { BigInt } from "@graphprotocol/graph-ts"
import { OwnerSet } from "../generated/Brastilava/Brastilava"
import { Brastilava } from "../generated/schema"

export function handleOwnerSet(event: OwnerSet): void {
  let entity = Brastilava.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new Brastilava(event.transaction.from.toHex())
    entity.count = BigInt.fromI32(0)
  }
  entity.count = entity.count + BigInt.fromI32(1)
  entity.oldOwner = event.params.oldOwner
  entity.newOwner = event.params.newOwner
  entity.save()
}
