import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialBalance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    const balance = this.transactions.reduce((newBalance, transaction) => {
      if (transaction.type === 'income') {
        return {
          ...newBalance,
          income: newBalance.income + transaction.value,
          total: newBalance.total + transaction.value,
        };
      }

      return {
        ...newBalance,
        outcome: newBalance.outcome + transaction.value,
        total: newBalance.total - transaction.value,
      };
    }, initialBalance);

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
