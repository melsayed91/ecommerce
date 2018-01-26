/* tslint:disable */

declare var Object: any;
export interface SysCodeInterface {
  "countryCode"?: string;
  "icon"?: string;
  "name": string;
  "creationDate"?: Date;
  "isDeleted"?: boolean;
  "id"?: any;
}

export class SysCode implements SysCodeInterface {
  "countryCode": string;
  "icon": string;
  "name": string;
  "creationDate": Date;
  "isDeleted": boolean;
  "id": any;
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
        "countryCode": {
          name: 'countryCode',
          type: 'string'
        },
        "icon": {
          name: 'icon',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "creationDate": {
          name: 'creationDate',
          type: 'Date'
        },
        "isDeleted": {
          name: 'isDeleted',
          type: 'boolean',
          default: false
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
