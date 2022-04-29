import { User } from 'src/app/models/user.model';

export interface UserState {
  user: User | null;
  theme: string;
  walletAddress:string|null;
}

export const initialState: UserState = {
    user: null,
    theme: 'fantasy',
    walletAddress:null
};
