import { DOCUMENT } from "@angular/common";

interface Styling {
  inject: (style: string) => void;
  setHeadElement: (headElement: HTMLHeadElement) => void;
}

interface ShadowStyling extends Styling {
  _stackStyle: string;
}

const shadowStyling: ShadowStyling = {
  inject(style: string): void {
    this._stackStyle += style;
  },

  setHeadElement(headElement): void {
    const inject = this.inject = (style: string) => {
      headElement.insertAdjacentHTML('beforeend', '<style>' + style + '</style>');
    };

    const stackStyle = this._stackStyle;
    if (stackStyle) {
      inject(stackStyle);
      this._stackStyle = null!;
    }
  },

  _stackStyle: '.ml-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}'
};

export const styling: Styling = shadowStyling;

/*
.ml-visually-hidden{
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
}
*/
