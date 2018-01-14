/* tslint:disable */

declare var Object: any;
export interface AccountInterface {
  "userId": any;
  "accountType"?: string;
  "data"?: any;
  "id"?: any;
}

export class Account implements AccountInterface {
  "userId": any;
  "accountType": string;
  "data": any;
  "id": any;
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
        "data": {
          name: 'data',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
