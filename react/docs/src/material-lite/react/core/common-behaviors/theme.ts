import { Falsy } from '@material-lite/react-cdk/utils';


export namespace Theme {
  export type Prop = string | Falsy;

  export interface Props {
    theme?: Prop
  }

  export interface Method {
    updateTheme: typeof updateTheme;
  }

  export interface Member {
    _classList: (string | null)[];
    _themeClassIndex: number;
  }

  export type PrivateNames = '_classList' | '_themeClassIndex';
}

export function updateTheme(this: Theme.Member, theme?: Theme.Prop, prevTheme?: Theme.Prop): true | void {
  if (theme !== prevTheme) {
    const classList = this._classList;
    const classIndex = this._themeClassIndex;
  
    if (prevTheme) {
      classList[classIndex] = null;
    }
  
    if (theme) {
      classList[classIndex] = 'ml-' + theme;
    }

    return true;
  }
}
