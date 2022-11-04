import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IManagerAreasWebPartProps {
    description: string;
    ListName: string;
    SiteUrl: string;
}
export default class ManagerAreasWebPart extends BaseClientSideWebPart<IManagerAreasWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=ManagerAreasWebPart.d.ts.map