import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllApplicationsData,
  getAppDataByName,
  setLoader,
} from "@/redux/reducer/Application";
import { BaseUrl } from "../Api/Api";
import { RootState } from "@/redux/store";
import { Loader } from "../Loader/Loader";

const Applications = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mount, setMount] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [applications, setApplications] = useState([]);

  const load = useSelector((state: RootState) => state?.applications?.loader);
  const applicationData = useSelector(
    (state: RootState) => state?.applications?.applicationsData
  );

  useEffect(() => {
    setMount(true);
  }, []);

  //fetch applications data
  useEffect(() => {
    dispatch(setLoader(true));
    if (mount) {
      axios
        .get(`${BaseUrl}/applications`)
        .then((res) => {
          dispatch(getAllApplicationsData(res.data));
          const items = [...res.data];
          setApplications(items?.sort() as []);
          dispatch(setLoader(false));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setLoader(false));
        });
    }
  }, [dispatch, mount]);

  //search function
  const getSearch = () => {
    let list = applicationData;
    if (searchString && setSearchString?.length > 0) {
      list = list?.filter((item) =>
        item
          ?.toString()
          ?.toLowerCase()
          ?.startsWith((searchString as string)?.toString()?.toLowerCase())
      );
    }
    return list;
  };

  const handleChange = (application: string) => {
    axios
      .get(`${BaseUrl}/applications/${application}`)
      .then((res) => {
        dispatch(getAppDataByName(res.data));
        router.push(`/applications/${application}`);
        dispatch(setLoader(false));
      })
      .catch((err) => {
        console.log(err);
        router.push(`/`);
        dispatch(setLoader(false));
      });
  };

  return (
    <section className="home-listing">
      <Loader open={load} />
      <div className="container">
        <div className="section-head mb-3">
          <h1>Applications</h1>
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
        <div className="row">
          {applications?.length > 0 &&
            (searchString?.length ? getSearch() : applications)?.map(
              (application) => (
                <div key={Math.random()} className="col-md-4 mb-4">
                  <div
                    className="card"
                    onClick={() => {
                      dispatch(setLoader(true));
                      handleChange(application);
                    }}
                  >
                    <h3 className="card-heading">{application}</h3>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </section>
  );
};

export default Applications;
