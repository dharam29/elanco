interface childrenType {
  children: ReactNode;
}

interface applicationsType {
  loader: boolean;
  applicationsData: string[];
  applicationsDataByName: {
    ServiceName: string;
    Cost: string;
    Date: string;
  }[];
  resourcesData: {
    ResourceGroup: string;
    ServiceName: string;
    Date: string;
    Cost: string;
    Location: string;
    ConsumedQuantity: string;
    InstanceId: string;
  }[];
}

interface appDetailType {
  ServiceName: string;
}
