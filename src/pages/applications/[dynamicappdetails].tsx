import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

import { BaseUrl } from "@/components/Api/Api";
import { Loader } from "@/components/Loader/Loader";
import { getAllResourcesData } from "@/redux/reducer/Application";

const Resources = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState("");
  const load = useSelector((state: RootState) => state?.applications?.loader);
  const appDataByName = useSelector(
    (state: RootState) => state?.applications?.applicationsDataByName
  );

  const uniqueResourceNames = (
    data: { ServiceName: string; Cost: string; Date: string }[]
  ) => {
    let uniqueNames: string[] = [];
    data.forEach((obj) => {
      if (!uniqueNames.includes(obj.ServiceName)) {
        uniqueNames.push(obj.ServiceName);
      }
    });
    return uniqueNames;
  };

  const getSearch = () => {
    let list = uniqueResourceNames(appDataByName);
    if (searchString && searchString?.length > 0) {
      if (searchString && setSearchString?.length > 0) {
        list = list?.filter((item) =>
          item
            ?.toString()
            ?.toLowerCase()
            ?.startsWith((searchString as string)?.toString()?.toLowerCase())
        );
      }
    }
    return list;
  };

  const handleResourceChange = (resourceName: string) => {
    axios
      .get(`${BaseUrl}/resources/${resourceName}`)
      .then((res) => {
        dispatch(getAllResourcesData(res.data));
        router.push(`/resources/${resourceName}`);
      })
      .catch((err) => {
        console.log(err);
        router.push(`/`);
      });
  };

  return (
    <section className="pt-3">
      <Loader open={load} />
      <div className="container">
        <div className="section-head mb-3">
          <h1>Resources</h1>
        </div>
        <div className="form-input">
          <input
            type="text"
            placeholder="Search"
            value={searchString}
            onChange={(e) => {
              const value = e.target.value;
              setSearchString(value);
            }}
          />
        </div>
        <div className="section-head mb-3">
          <h5>
            Application :{" "}
            <span className="blue-heading">
              {appDataByName[0]["ResourceGroup"]}
            </span>
          </h5>
        </div>
        <div className="row">
          {appDataByName?.length > 0 &&
            (searchString?.length
              ? getSearch()
              : uniqueResourceNames(appDataByName)
            )?.map((resourceName) => (
              <div key={Math.random()} className="col-md-4 mb-4">
                <div
                  className="card"
                  onClick={() => handleResourceChange(resourceName)}
                >
                  <h3 className="card-heading">
                    Resource Name: {resourceName as unknown as string}
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
