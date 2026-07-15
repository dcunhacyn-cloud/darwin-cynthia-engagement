import type React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        "camera-orbit"?: string;
        "auto-rotate"?: boolean;
        "rotation-per-second"?: string;
        "disable-zoom"?: boolean;
      };
    }
  }
}
