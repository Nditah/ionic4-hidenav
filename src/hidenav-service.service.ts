import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HidenavService {

    data = [];
    tapping = false;

    constructor() {
    }

    initiate(name) {
        if(!(this.data[name] && this.data[name].content && this.data[name].header))
            return false;
        if(this.data[name].scrollTop == null)
            this.data[name].scrollTop = 0;
        if(this.data[name].lastscroll == null)
            this.data[name].lastscroll = 0;
        if(this.data[name].direction == null)
            this.data[name].direction = '';
        this.data[name].content.scrollEvents = true;
        setTimeout(() => {
            this.data[name].navheight = this.data[name].header.nativeElement.offsetHeight;
            let scrollContent: any = this.data[name].contentElem.nativeElement.shadowRoot.querySelector('.inner-scroll');
            scrollContent.style.top = '-' + this.data[name].navheight + 'px';
            scrollContent.style.paddingTop = parseInt(window.getComputedStyle(scrollContent)['padding-top'], 10) + this.data[name].navheight + 'px';
        }, 100);
        this.data[name].content.ionScroll.subscribe((e) => {
            this.data[name].scrolling = true;
            let x = this.data[name].lastscroll - e.detail.scrollTop;
            this.data[name].direction = x > 0 ? 'up' : 'down';
            this.data[name].lastscroll = e.detail.scrollTop;
            this.data[name].scrollTop = this.data[name].scrollTop - x;
            if (this.data[name].scrollTop > this.data[name].navheight)
                this.data[name].scrollTop = this.data[name].navheight;
            if (this.data[name].scrollTop < 0)
                this.data[name].scrollTop = 0;
            this.data[name].header.nativeElement.style.transform = 'translate3d(0, ' + -this.data[name].scrollTop + 'px, 0)';
        });
        this.data[name].contentElem.nativeElement.addEventListener('touchend', () => {this.tapping = false;this.c(name);});
        this.data[name].contentElem.nativeElement.addEventListener('touchstart', () => this.tapping = true);
        this.data[name].content.ionScrollEnd.subscribe(() => {this.data[name].scrolling = false;this.c(name)});
    }

    private c(name) {
        if(this.tapping || this.data[name].scrolling)
            return false;
        if (this.data[name].scrollTop == 0 || this.data[name].scrollTop == this.data[name].navheight)
            return false;
        let content = this.data[name].content;
        let scrollTopTemp = this.data[name].scrollTop;
        if (this.data[name].direction == 'down') {
            if (this.data[name].scrollTop < this.data[name].navheight) {
                content.scrollByPoint(0, (this.data[name].navheight - scrollTopTemp), (this.data[name].navheight - scrollTopTemp) * 6);
            }
        } else if (this.data[name].direction == 'up') {
            if (this.data[name].scrollTop < this.data[name].navheight) {
                content.scrollByPoint(0, -scrollTopTemp, scrollTopTemp * 6);

            }
        }
    }
}
