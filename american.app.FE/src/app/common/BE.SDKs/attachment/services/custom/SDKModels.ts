/* tslint:disable */
import { Injectable } from '@angular/core';
import { Container } from '../../models/Container';
import { Attachment } from '../../models/Attachment';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Container: Container,
    Attachment: Attachment,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
