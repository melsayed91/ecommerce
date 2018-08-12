/* tslint:disable */

declare var Object: any;
export interface MessageServiceApiInterface {
  "id"?: number;
}

export class MessageServiceApi implements MessageServiceApiInterface {
  "id": number;
  constructor(data?: MessageServiceApiInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MessageServiceApi`.
   */
  public static getModelName() {
    return "MessageServiceApi";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MessageServiceApi for dynamic purposes.
  **/
  public static factory(data: MessageServiceApiInterface): MessageServiceApi{
    return new MessageServiceApi(data);
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
      name: 'MessageServiceApi',
      plural: 'MessageServiceApis',
      path: 'MessageServiceApis',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
