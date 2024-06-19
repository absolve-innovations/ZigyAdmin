import { Guid } from 'guid-typescript';

export class ConstantValues {
  public static consDeviceType = 'Web';
  public static consDeviceToken = Guid.create().toString();
}
