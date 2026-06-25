export type OgImageOption = {
  heading?: string;
  text?: string;
  template?: string;
  center?: boolean;
  width?: number;
  height?: number;
  baseUrl?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientDegree?: string;
};

export type OgImageOptionConverted = {
  [key in keyof OgImageOption]?: string;
};
