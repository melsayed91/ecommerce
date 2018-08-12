/* tslint:disable */

declare var Object: any;
export interface SysCodeInterface {
  "name": string;
  "icon"?: string;
  "class"?: string;
  "isDeleted"?: boolean;
  "countryCode"?: string;
  "id"?: any;
  "parentId"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  parent?: any;
}

export class SysCode implements SysCodeInterface {
  "name": string;
  "icon": string;
  "class": string;
  "isDeleted": boolean;
  "countryCode": string;
  "id": any;
  "parentId": any;
  "createdAt": Date;
  "updatedAt": Date;
  parent: any;
  constructor(data?: SysCodeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SysCode`.
   */
  public static getModelName() {
    return "SysCode";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SysCode for dynamic purposes.
  **/
  public static factory(data: SysCodeInterface): SysCode{
    return new SysCode(data);
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
      name: 'SysCode',
      plural: 'SysCodes',
      path: 'SysCodes',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "icon": {
          name: 'icon',
          type: 'string'
        },
        "class": {
          name: 'class',
          type: 'string'
        },
        "isDeleted": {
          name: 'isDeleted',
          type: 'boolean',
          default: false
        },
        "countryCode": {
          name: 'countryCode',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "parentId": {
          name: 'parentId',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
        parent: {
          name: 'parent',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'parentId',
          keyTo: 'id'
        },
      }
    }
  }
}
