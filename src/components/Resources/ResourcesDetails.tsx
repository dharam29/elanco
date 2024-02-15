import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";

const ResourcesDetails = () => {
  const dataCount = 15;
  const [pageNumber, setPageNumber] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortProperty, setSortProperty] = useState("ResourceGroup");
  const [pageWiseData, setPageWiseData] = useState<
    {
      ResourceGroup: string;
      ServiceName: string;
      Date: string;
      Cost: string;
      Location: string;
      ConsumedQuantity: string;
      InstanceId: string;
    }[]
  >([]);
  const load = useSelector((state: RootState) => state?.applications?.loader);
  const resourcesData = useSelector(
    (state: RootState) => state?.applications?.resourcesData
  );
  const endingIndex = dataCount * pageNumber;
  const startingIndex = dataCount * (pageNumber - 1);

  useEffect(() => {
    const list = resourcesData;
    const dataToDisplay = list?.slice(startingIndex, endingIndex);
    setPageWiseData(dataToDisplay as never);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startingIndex, endingIndex, resourcesData]);

  const handlePageChange = (e: { selected: number }) => {
    setPageNumber(e.selected + 1);
  };
  //search by ResourceGroup and ServiceName
  const getSearch = () => {
    let list = resourcesData;
    if (searchString && searchString?.length > 0) {
      list = list?.filter((item) => {
        return Object?.keys(item)?.some(
          () =>
            (item &&
              item.ResourceGroup &&
              item.ResourceGroup?.toString()
                ?.toLowerCase()
                ?.startsWith(
                  (searchString as string)?.toString()?.toLowerCase()
                )) ||
            (item &&
              item.ServiceName &&
              item.ServiceName?.toString()
                ?.toLowerCase()
                ?.startsWith(
                  (searchString as string)?.toString()?.toLowerCase()
                ))
        );
      });
    }
    return list;
  };
  //manage-sorting
  const sortByProperty = (property: string) => {
    const sortedData = [...pageWiseData].sort((a: any, b: any) => {
      if (property === "Date") {
        // For sorting by date
        return sortOrder === "asc"
          ? a.Date.localeCompare(b.Date)
          : b.Date.localeCompare(a.Date);
      } else {
        // For sorting by other properties
        const valueA = a[property];
        const valueB = b[property];
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
    });

    setPageWiseData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortProperty(property);
  };
  //manage-sorting-icons
  const getSortIcon = (property: string) => {
    if (sortProperty === property) {
      return sortOrder === "asc" ? (
        <FontAwesomeIcon icon={faSortUp} />
      ) : (
        <FontAwesomeIcon icon={faSortDown} />
      );
    }
    return null;
  };

  return (
    <section className="py-3">
      <Loader open={load} />
      <div className="container">
        <div className="form-input">
          <input
            type="text"
            placeholder="search"
            value={searchString}
            onChange={(e) => {
              const value = e.target.value;
              setSearchString(value);
            }}
          />
        </div>
        <div className="cus-table">
          <Table responsive>
            <thead>
              <tr>
                <th onClick={() => sortByProperty("ResourceGroup")}>
                  Application Name {getSortIcon("ResourceGroup")}
                </th>
                <th onClick={() => sortByProperty("ServiceName")}>
                  Resource Name {getSortIcon("ServiceName")}
                </th>
                <th onClick={() => sortByProperty("Date")}>
                  Date {getSortIcon("Date")}
                </th>
                <th onClick={() => sortByProperty("Cost")}>
                  Cost {getSortIcon("Cost")}
                </th>
                <th>Location</th>
                <th>Consumed Quantity</th>
                <th>InstanceId</th>
              </tr>
            </thead>
            <tbody>
              {pageWiseData?.length > 0 &&
                (searchString?.length > 0 ? getSearch() : pageWiseData)?.map(
                  (item, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          {item?.ResourceGroup?.charAt(0)?.toUpperCase() +
                            item?.ResourceGroup?.slice(1)}
                        </td>
                        <td>
                          {item?.ServiceName?.charAt(0)?.toUpperCase() +
                            item?.ServiceName?.slice(1)}
                        </td>
                        <td>{item?.Date}</td>
                        <td>{item?.Cost}</td>
                        <td>{item?.Location}</td>
                        <td>{item?.ConsumedQuantity}</td>
                        <td>{item?.InstanceId}</td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </Table>
        </div>
        <ReactPaginate
          initialPage={0}
          previousLabel="Previous"
          nextLabel="Next"
          forcePage={pageNumber - 1}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={
            searchString?.length
              ? 1
              : Math.ceil(resourcesData?.length / dataCount)
          }
          marginPagesDisplayed={3}
          pageRangeDisplayed={5}
          onPageChange={(event) => {
            handlePageChange(event);
          }}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </section>
  );
};

export default ResourcesDetails;
