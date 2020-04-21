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
    const balance = this.transactionRepositories.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            accumulator.total += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            accumulator.total -= transaction.value;
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }
}

export default TransactionRepository;
