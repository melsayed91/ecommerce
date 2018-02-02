/* tslint:disable */

declare var Object: any;
export interface SysUserInterface {
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: any;
  "password"?: string;
  accessTokens?: any[];
  Account?: any;
}

export class SysUser implements SysUserInterface {
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": any;
  "password": string;
  accessTokens: any[];
  Account: any;
  constructor(data?: SysUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SysUser`.
   */
  public static getModelName() {
    return "SysUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SysUser for dynamic purposes.
  **/
  public static factory(data: SysUserInterface): SysUser{
    return new SysUser(data);
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
      name: 'SysUser',
      plural: 'SysUsers',
      path: 'SysUsers',
      idName: 'id',
      properties: {
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        Account: {
          name: 'Account',
          type: 'any',
          model: '',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
      }
    }
  }
}
