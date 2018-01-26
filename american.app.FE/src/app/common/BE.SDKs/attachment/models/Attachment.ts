/* tslint:disable */

declare var Object: any;
export interface AttachmentInterface {
  "originalFileName"?: string;
  "name"?: string;
  "type"?: string;
  "url": string;
  "creationDate"?: Date;
  "id"?: any;
}

export class Attachment implements AttachmentInterface {
  "originalFileName": string;
  "name": string;
  "type": string;
  "url": string;
  "creationDate": Date;
  "id": any;
  constructor(data?: AttachmentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Attachment`.
   */
  public static getModelName() {
    return "Attachment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Attachment for dynamic purposes.
  **/
  public static factory(data: AttachmentInterface): Attachment{
    return new Attachment(data);
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
      name: 'Attachment',
      plural: 'Attachments',
      path: 'Attachments',
      idName: 'id',
      properties: {
        "originalFileName": {
          name: 'originalFileName',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "url": {
          name: 'url',
          type: 'string'
        },
        "creationDate": {
          name: 'creationDate',
          type: 'Date'
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
