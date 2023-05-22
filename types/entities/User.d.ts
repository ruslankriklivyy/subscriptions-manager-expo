import { IFirebaseImage } from '../common/IFirebaseImage';

export interface IUser {
  id: string;
  avatar: IFirebaseImage;
  full_name: string;
  email: string;
  birth_date: any;
}
