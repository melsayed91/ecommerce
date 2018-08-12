import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Rx';
@Injectable()
export class HeaderService{
  show:Subject<boolean> = new Subject();
}
