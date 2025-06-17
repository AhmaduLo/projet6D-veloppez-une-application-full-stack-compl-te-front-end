import { Theme } from "./theme.model";

export interface Subscription {
  id: number;
  userId: number;
  themeId: number;
   theme: Theme;
}