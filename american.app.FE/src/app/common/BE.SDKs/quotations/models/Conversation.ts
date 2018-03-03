/* tslint:disable */

declare var Object: any;
export interface ConversationInterface {
  "type"?: string;
  "creationDate": Date;
  "modificationDate"?: Date;
  "id"?: any;
  "participantIds"?: Array<any>;
  "specificationId"?: any;
  accounts?: any[];
  specificationRequest?: any;
}

export class Conversation implements ConversationInterface {
  "type": string;
  "creationDate": Date;
  "modificationDate": Date;
  "id": any;
  "participantIds": Array<any>;
  "specificationId": any;
  accounts: any[];
  specificationRequest: any;
  constructor(data?: ConversationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Conversation`.
   */
  public static getModelName() {
    return "Conversation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Conversation for dynamic purposes.
  **/
  public static factory(data: ConversationInterface): Conversation{
    return new Conversation(data);
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
      name: 'Conversation',
      plural: 'Conversations',
      path: 'Conversations',
      idName: 'id',
      properties: {
        "type": {
          name: 'type',
          type: 'string'
        },
        "creationDate": {
          name: 'creationDate',
          type: 'Date'
        },
        "modificationDate": {
          name: 'modificationDate',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "participantIds": {
          name: 'participantIds',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "specificationId": {
          name: 'specificationId',
          type: 'any'
        },
      },
      relations: {
        accounts: {
          name: 'accounts',
          type: 'any[]',
          model: '',
          relationType: 'referencesMany',
                  keyFrom: 'participantIds',
          keyTo: 'id'
        },
        specificationRequest: {
          name: 'specificationRequest',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'specificationId',
          keyTo: 'id'
        },
      }
    }
  }
}
