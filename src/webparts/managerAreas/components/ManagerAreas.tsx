import * as React from 'react';
import styles from './ManagerAreas.module.scss';
import { IManagerAreasProps } from './IManagerAreasProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse, IHttpClientOptions, SPHttpClientConfiguration, ISPHttpClientOptions } from '@microsoft/sp-http';
import '../components/Custom.css';
import { SPComponentLoader } from '@microsoft/sp-loader';
export interface IManagerAreasState {
  ManagerAreasData: any;
}
export default class ManagerAreas extends React.Component<IManagerAreasProps, IManagerAreasState> {
  constructor(props) {
    super(props);
    SPComponentLoader.loadCss("https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css");
    this.state = {
      ManagerAreasData: []
    };
  }


  public componentDidMount() {
    this.getItems().then((response) => {
      console.log("response", response);
      var data = [];
      response.value.forEach(element => {
        let imageurl = element.AttachmentFiles.length > 0 ? this.props.SiteUrl + element.AttachmentFiles[0].ServerRelativeUrl : '';
        data.push({
          Image: imageurl, Id: element.ID, Heading: element.Title, DescriptionText: element.Description
          , Link: element.UrlLink != null ? element.UrlLink : ''
        });
      });

      this.setState({ ManagerAreasData: data });
    });
  }
  public render(): React.ReactElement<IManagerAreasProps> {
    return (
      // <div className={ styles.managerAreas }>
      //   <div className={ styles.container }>
      <section className="sec-color pt-5 pb-3">
        <div className="container">
          <div className="row pb-5 mt-5">
            {this.state.ManagerAreasData.map((item) => {
              if (item.Link != '') {
                return (
                  <div className="col-lg-4 text-center pb-4">
<a href={item.Link} className="customlink">
                    <div className="box-bg2 p-4 pt-5 pb-5">
                      <img src={item.Image} width="63" />
                      <p className="box-p fontBold mt-3"><b>{item.Heading}</b></p>
                      <p className="fontRegular mt-3">{item.DescriptionText}</p>
                    </div>
                    </a>
                  </div>
                );
              } else {
                return (
                  <div className="col-lg-4 text-center pb-4">

                    <div className="box-bg2 p-4 pt-5 pb-5">
                      <img src={item.Image} width="63" />
                      <p className="box-p fontBold mt-3"><b>{item.Heading}</b></p>
                      <p className="fontRegular mt-3">{item.DescriptionText}</p>
                    </div>

                  </div>
                );
              }

            })
            }
          </div>
        </div>
      </section>
      //   </div>
      // </div>
    );
  }
  public getItems(): Promise<any> {
    try {
      var requestUrl = this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('" + this.props.ListName + "')/items?$select=*,AttachmentFiles&$expand=AttachmentFiles";
      console.log("requestUrl", requestUrl);

      return this.props.context.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            console.log(response);
            return response.json();
          }
        });

    } catch (error) {
      console.log("Error while getting items", error);
    }
  }
}
