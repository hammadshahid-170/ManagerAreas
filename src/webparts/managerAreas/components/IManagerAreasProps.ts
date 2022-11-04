import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IManagerAreasProps {
  description: string;
  context: WebPartContext;
  ListName: string;
  SiteUrl: string;
}