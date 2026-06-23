export type OgImageOption = {
  heading?: string;
  text?: string;
  template?: string;
  center?: boolean;
  width?: number;
  height?: number;
  blur?: boolean;
};

export type OgImageOptionConverted = {
  [key in keyof OgImageOption]?: string;
};
