import { NgModule } from '@angular/core';
import {HidenavContentDirective} from "./hidenav-content.directive";
import {HidenavHeaderDirective} from "./hidenav-header.directive";
import {HidenavStretchheaderComponent} from "./hidenav-stretchheader.component";

@NgModule({
    declarations: [
        HidenavContentDirective,
        HidenavHeaderDirective,
        HidenavStretchheaderComponent
    ],
    exports: [
        HidenavContentDirective,
        HidenavHeaderDirective,
        HidenavStretchheaderComponent
    ]
})
export class HidenavModule {}