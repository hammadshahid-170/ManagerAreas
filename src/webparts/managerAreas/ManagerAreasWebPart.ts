import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ManagerAreasWebPartStrings';
import ManagerAreas from './components/ManagerAreas';
import { IManagerAreasProps } from './components/IManagerAreasProps';

export interface IManagerAreasWebPartProps {
  description: string;
  ListName: string;
  SiteUrl: string;
}

export default class ManagerAreasWebPart extends BaseClientSideWebPart<IManagerAreasWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IManagerAreasProps> = React.createElement(
      ManagerAreas,
      {
        description: this.properties.description,
        ListName: this.properties.ListName,
        SiteUrl: this.properties.SiteUrl,
        context:this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('ListName', {
                  label: 'List Name'
                }),
                PropertyPaneTextField('SiteUrl', {
                  label: 'Root Site Url'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
