import { User } from "./user.model";

export interface ProfileInitialState {
    profile: User;
}
  
export const initialProfileState: ProfileInitialState = {
    profile: {
        id: 0,
        firstName: '',
        lastName: '',
        avatar: '',
        email: '',
    }
};