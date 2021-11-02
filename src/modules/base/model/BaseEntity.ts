import { randomUUID } from "crypto";
import { PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

class BaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}

export { BaseEntity }
