import { NgModule } from '@angular/core';
import {HidenavContentDirective} from "./hidenav-content.directive";
import {HidenavHeaderDirective} from "./hidenav-header.directive";

@NgModule({
    declarations: [
        HidenavContentDirective,
        HidenavHeaderDirective
    ],
    exports: [
        HidenavContentDirective,
        HidenavHeaderDirective
    ]
})
export class HidenavModule {}