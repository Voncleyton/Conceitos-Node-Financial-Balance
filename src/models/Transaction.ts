import { uuid } from 'uuidv4';

class Tansaction {
  id: string;

  title: string;

  value: number;

  type: string;

  constructor({ title, value, type }: Omit<Tansaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}

export default Tansaction;
