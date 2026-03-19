export type OgImageOption = {
  heading?: string;
  text?: string;
  template?: string;
  center?: boolean;
  width?: number;
  height?: number;
};

export type OgImageOptionConverted = {
  [key in keyof OgImageOption]?: string;
};
