import React, { Component } from 'react';
import { classNamePipe, MlProps, styling } from '@material-lite/react-cdk/utils';
import { createRef } from 'react';

styling.inject('.ml-button{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;position:relative;overflow:visible;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;vertical-align:middle;cursor:pointer;font-weight:500;font-family:inherit;font-size:14px;white-space:nowrap;color:inherit;border:none;outline:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;will-change:opacity}.ml-button:focus .ml-button-overlay{opacity:.064}.ml-button:not(:focus-visible) .ml-button-overlay{opacity:0}.ml-button svg{fill:currentColor}.ml-button a,a.ml-button{text-decoration:none;color:inherit}.ml-button a:link,a.ml-button:link{color:#2196f3}.ml-button a:visited,a.ml-button:visited{color:#9c27b0}.ml-simple-button{background-color:transparent}.ml-basic-button,.ml-raised-button,.ml-stroked-button,.ml-flat-button{min-width:64px;height:36px;padding:0 16px;border-radius:4px}.ml-icon-button,.ml-fab{height:40px;width:40px;padding:0;border-radius:50%;font-size:24px;fill:currentColor}.ml-raised-button .ml-button-ripple-outlet{-webkit-box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0, 0, 0, 0.12);box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0, 0, 0, 0.12);-webkit-transition:-webkit-box-shadow 280ms cubic-bezier(0, 0, 0.2, 1);transition:-webkit-box-shadow 280ms cubic-bezier(0, 0, 0.2, 1);transition:box-shadow 280ms cubic-bezier(0, 0, 0.2, 1);transition:box-shadow 280ms cubic-bezier(0, 0, 0.2, 1), -webkit-box-shadow 280ms cubic-bezier(0, 0, 0.2, 1)}.ml-raised-button:active .ml-button-ripple-outlet{-webkit-box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12);box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.ml-stroked-button{padding:0 15px;border:1px solid}.ml-fab .ml-button-ripple-outlet{-webkit-box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12);box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12);-webkit-transition:-webkit-box-shadow 280ms cubic-bezier(0, 0, 0.2, 1);transition:-webkit-box-shadow 280ms cubic-bezier(0, 0, 0.2, 1);transition:box-shadow 280ms cubic-bezier(0, 0, 0.2, 1);transition:box-shadow 280ms cubic-bezier(0, 0, 0.2, 1), -webkit-box-shadow 280ms cubic-bezier(0, 0, 0.2, 1)}.ml-fab:active .ml-button-ripple-outlet{-webkit-box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12);box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)}.ml-anchor-button{padding:0}.ml-anchor-button a{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:100%;width:100%;padding:0 16px}.ml-button-ripple-outlet,.ml-button-overlay{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:inherit;pointer-events:none}.ml-button-overlay{background-color:currentColor;opacity:0}.ml-hoverable-button .ml-button-overlay{-webkit-transition:opacity 280ms cubic-bezier(0.36, 0, 0.24, 1);transition:opacity 280ms cubic-bezier(0.36, 0, 0.24, 1)}.ml-hoverable-button:hover .ml-button-overlay{opacity:.064}.ml-button.ml-disabled{cursor:default;-webkit-box-shadow:0 0 0 0 transparent !important;box-shadow:0 0 0 0 transparent !important}.ml-disabled .ml-button-ripple-outlet{-webkit-box-shadow:0 0 0 0 transparent !important;box-shadow:0 0 0 0 transparent !important}.ml-disabled .ml-button-overlay{display:none !important}');

export interface MlButtonProps extends MlProps, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

class MlButton extends Component<MlButtonProps> {
  private _classList = ['ml-button', 'ml-test'];

  componentDidMount() {
    console.log(this.props.className);
    // const elRef = this.props.elementRef;
    // elRef!.current!.classList.add('ml-button');
  }

  onSetRippleOutlet(ref: HTMLDivElement) {
    console.log(ref, 'outlet');
  }

  render() {
    const { elementRef, children, className, ...rest } = this.props;

    return (
      <div {...rest} className={classNamePipe(this._classList)} ref={elementRef}>
        { children }
        <span className="ml-button-overlay"></span>
        <div className="ml-button-ripple-outlet" ref={this.onSetRippleOutlet}></div>
      </div>
    );
  }
}

export default MlButton;
