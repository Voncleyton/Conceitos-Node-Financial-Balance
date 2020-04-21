import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionRepository {
  private transactionRepositories: Transaction[];

  constructor() {
    this.transactionRepositories = [];
  }

  public list(): Transaction[] {
    return this.transactionRepositories;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactionRepositories.push(transaction);

    return transaction;
  }

  public getBalance(): Balance {
    const incomesTotal = this.transactionRepositories
      .filter(({ type }) => type === 'income')
      .reduce((sum, record) => sum + record.value, 0);

    const outcomesTotal = this.transactionRepositories
      .filter(({ type }) => type === 'outcome')
      .reduce((sum, record) => sum + record.value, 0);

    const balance = {
      income: incomesTotal,
      outcome: outcomesTotal,
      total: incomesTotal - outcomesTotal,
    };

    return balance;
  }
}

export default TransactionRepository;
