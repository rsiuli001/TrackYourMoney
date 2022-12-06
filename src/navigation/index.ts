import AccountsStack from './accountsStack';
import { default as RootStack } from './bottomTab';
import MoreStack from './moreStack';
import StatsStack from './statsStack';
import TransactionStack from './transactionStack';

const today = new Date();

const RootStacks = [
  {
    component: TransactionStack,
    name: 'Transactions',
    options: {
      tabBarLabel: `${today.getDate()}/${today.getMonth() + 1}`
    }
  },
  {
    component: StatsStack,
    name: 'Stats'
  },
  {
    component: AccountsStack,
    name: 'Accounts'
  },
  {
    component: MoreStack,
    name: 'More'
  }
];

export { RootStacks, RootStack };
