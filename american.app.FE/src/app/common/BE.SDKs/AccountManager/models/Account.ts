/* tslint:disable */
import {
  AccountData
} from '../index';

declare var Object: any;
export interface AccountInterface {
  "userId": any;
  "accountType"?: string;
  "id"?: any;
  "accountDataId"?: any;
  accountData?: AccountData;
}

export class Account implements AccountInterface {
  "userId": any;
  "accountType": string;
  "id": any;
  "accountDataId": any;
  accountData: AccountData;
  constructor(data?: AccountInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Account`.
   */
  public static getModelName() {
    return "Account";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Account for dynamic purposes.
  **/
  public static factory(data: AccountInterface): Account{
    return new Account(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Account',
      plural: 'Accounts',
      path: 'Accounts',
      idName: 'id',
      properties: {
        "userId": {
          name: 'userId',
          type: 'any'
        },
        "accountType": {
          name: 'accountType',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "accountDataId": {
          name: 'accountDataId',
          type: 'any'
        },
      },
      relations: {
        accountData: {
          name: 'accountData',
          type: 'AccountData',
          model: 'AccountData',
          relationType: 'belongsTo',
                  keyFrom: 'accountDataId',
          keyTo: 'id'
        },
      }
    }
  }
}
