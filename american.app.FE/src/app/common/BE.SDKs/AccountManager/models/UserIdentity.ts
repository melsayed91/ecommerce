/* tslint:disable */

declare var Object: any;
export interface UserIdentityInterface {
  "id"?: any;
  "userId"?: any;
  user?: any;
}

export class UserIdentity implements UserIdentityInterface {
  "id": any;
  "userId": any;
  user: any;
  constructor(data?: UserIdentityInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserIdentity`.
   */
  public static getModelName() {
    return "UserIdentity";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UserIdentity for dynamic purposes.
  **/
  public static factory(data: UserIdentityInterface): UserIdentity{
    return new UserIdentity(data);
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
      name: 'UserIdentity',
      plural: 'userIdentities',
      path: 'userIdentities',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "userId": {
          name: 'userId',
          type: 'any'
        },
      },
      relations: {
        user: {
          name: 'user',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
      }
    }
  }
}
