import mongoose from "mongoose";
import { UniqueId } from "@amirmarmul/waba-common";

export class UserId extends UniqueId {
  constructor() {
    const objectId = new mongoose.Types.ObjectId();
    super(objectId.toString())
  }
}