import { UniqueId } from "@aptana/multichannel-common";
import mongoose from "mongoose";

export class UserId extends UniqueId {
  constructor() {
    const objectId = new mongoose.Types.ObjectId();
    super(objectId.toString())
  }
}