import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactory,
         ComponentFactoryResolver, ComponentRef} from '@angular/core';
import { LogService } from '../../services/log.service';
import { DynamicHostDirective } from './directive/dynamic-host-directive';
import { IData } from './data-interface';
import { ItemAComponent } from './content/item-a/item-a.component';
import { ItemBComponent } from './content/item-b/item-b.component';
import { DynamicItem } from './dynamic-item';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicFormComponent implements OnInit {
  @ViewChild(DynamicHostDirective)
  host: DynamicHostDirective;
  items: DynamicItem[];

  constructor(private logService: LogService, private componentFactoryResolver: ComponentFactoryResolver) {
    logService.log('DynamicFormComponent is created');
  }

  ngOnInit() {
    this.items = [
       new DynamicItem(ItemAComponent, {name: 'Comment Form', title: 'Comment', user: 'guest'}),
       new DynamicItem(ItemBComponent, {name: 'Login Form', title: 'Login', checked: true})
    ];
  }

  load(item: DynamicItem) {
    const viewContainerRef: ViewContainerRef = this.host.viewContainerRef;
    viewContainerRef.clear();
    const componentFactory: ComponentFactory<IData> = this.componentFactoryResolver.resolveComponentFactory(item.type);
    const componentRef: ComponentRef<IData> = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.data = item.data;
  }
}
