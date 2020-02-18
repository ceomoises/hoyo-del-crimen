import { Directive, Input } from '@angular/core';
import { NgControl } from "@angular/forms";

@Directive({
    selector: '[disablecontrol]'
})

export class DisableControlDirective {

    constructor(
        private ngControl: NgControl
        ) { }

    @Input() set disablecontrol(condition: boolean) {
        const action = condition ? 'disable' : 'enable';
        this.ngControl.control[action]();
    }
}