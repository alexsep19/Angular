import { Directive, Input, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { LogService } from '../services/log.service';

@Directive({
  selector: '[marker]'
})
export class MarkerDirective implements AfterViewInit {

  @Input()
  color: string;

  constructor(private logService: LogService, private element: ElementRef, private renderer: Renderer2) {
    logService.log('MarkerDirective is created');
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.element.nativeElement, 'background-color', this.color || 'yellow');
    this.renderer.setStyle(this.element.nativeElement, 'font-weight', 'bold');
  }
}
