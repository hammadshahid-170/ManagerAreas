import * as React from 'react';
import { IManagerAreasProps } from './IManagerAreasProps';
import '../components/Custom.css';
export interface IManagerAreasState {
    ManagerAreasData: any;
}
export default class ManagerAreas extends React.Component<IManagerAreasProps, IManagerAreasState> {
    constructor(props: any);
    componentDidMount(): void;
    render(): React.ReactElement<IManagerAreasProps>;
    getItems(): Promise<any>;
}
//# sourceMappingURL=ManagerAreas.d.ts.map