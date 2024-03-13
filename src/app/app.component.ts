import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, QueryList, ViewChild, ViewChildren, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  theme: Theme = 'light-theme';

  title = 'card-animado';


  clickDesign = false;
  clickFront = false;
  clickBack = false;


  timeline = gsap.timeline({defaults: {duration: 1.5, ease: 'linear'}});

  @ViewChild('cardInvertDesign')
  cardDesign!: ElementRef<HTMLDivElement>

  @ViewChild('cardInvertFront')
  cardFront!: ElementRef<HTMLDivElement>

  @ViewChild('cardInvertBack')
  cardBack!: ElementRef<HTMLDivElement>

  @ViewChild('design')
  design!: ElementRef<HTMLDivElement>

  @ViewChild('front')
  front!: ElementRef<HTMLDivElement>

  @ViewChild('back')
  back!: ElementRef<HTMLDivElement>


  // switch theme
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {

  }

  ngOnInit() {
    this.initializeTheme();
    debugger
  }


  switchTheme() {
    this.document.body.classList.replace(
      this.theme,
      this.theme === 'light-theme' ? (this.theme = 'dark-theme') : (this.theme = 'light-theme')
    )
  }
  initializeTheme = (): void =>
    this.renderer.addClass(this.document.body, this.theme);

  // animação
  ngAfterViewInit() {
    this.timeline
      .from(this.back.nativeElement, { opacity: 0, position: 'relative', left: '-150px', duration: 2, background: '#E0E1EB' })
      .from(this.front.nativeElement, { opacity: 0, position: 'relative', left: '-150px', duration: 2 })
      .from(this.design.nativeElement, { opacity: 0, position: 'relative', left: '-150px', duration: 2 })
  }


  invertDesign() {
    this.clickDesign = !this.clickDesign;
    this.theme === 'light-theme' ?
      this.clickDesign ? this.animateIn(this.design, this.cardDesign, '#EDB526') : this.animateOut(this.design, this.cardDesign, '#E0E1EB') :
      this.clickDesign ? this.animateIn(this.design, this.cardDesign, '#EDB526') : this.animateOut(this.design, this.cardDesign, '#2B2D3C')
  }


  invertFront() {
    this.clickFront = !this.clickFront;
    this.theme === 'light-theme' ?
      this.clickFront ? this.animateIn(this.front, this.cardFront, '#273EED') : this.animateOut(this.front, this.cardFront, '#E0E1EB') :
      this.clickFront ? this.animateIn(this.front, this.cardFront, '#273EED') : this.animateOut(this.front, this.cardFront, '#2B2D3C')
  }

  invertBack() {
    this.clickBack = !this.clickBack;
    this.theme === 'light-theme' ?
      this.clickBack ? this.animateIn(this.back, this.cardBack, '#F04242') : this.animateOut(this.back, this.cardBack, '#E0E1EB') :
      this.clickBack ? this.animateIn(this.back, this.cardBack, '#F04242') : this.animateOut(this.back, this.cardBack, '#2B2D3C')
  }

  animateIn(infoCard: any, infoCardFlip: any, bgColor: string) {
    this.timeline
        .to(infoCard.nativeElement, {position: 'relative', top: '-150px', background: bgColor})
        .to(infoCard.nativeElement.children[0], {opacity: 0, duration: 1})
        .to(infoCardFlip.nativeElement, {
        top: '7px',
        opacity: 1,
        visibility: 'visible',
        })
        .to(infoCard.nativeElement, {position: 'relative', top: '0px'})
  }

  animateOut(infoCard: any, infoCardFlip: any, bgColor: string) {
    this.timeline
      .to(infoCard.nativeElement, {position: 'relative', top: '-150px', background: bgColor})
      .to(infoCardFlip.nativeElement, {
        top: '-50px',
        opacity: 0,
      })
      .to(infoCard.nativeElement.children[0], {opacity: 1})
      .to(infoCard.nativeElement, {position: 'relative', top: '0px'})
      .set(infoCard.nativeElement, { clearProps: 'all' })
  }
}

export type Theme = 'light-theme' | 'dark-theme';
