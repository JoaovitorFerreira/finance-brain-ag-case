import { Column, Entity } from 'typeorm';

@Entity()
export class User {
  @Column({ type: 'varchar', length: 256 })
  id: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;
}
