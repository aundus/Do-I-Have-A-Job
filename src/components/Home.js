import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

const Home = () => {
  const [allJobs, setAllJobs] = useState(undefined);
  const [displayData, setDisplayData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState(undefined);
  let list = null;

  useEffect(() => {
    async function fetchData() {
      if (allJobs && searchTerm) {
        const regex = new RegExp(`${searchTerm}`, "i");
        setDisplayData(
          allJobs.filter((job) => {
            return job.company === undefined ? false : job.company.match(regex);
          })
        );
      } else {
        const res = await axios.get("http://192.168.1.176:3001/getData");
        setAllJobs(res.data);
        setDisplayData(res.data);
        setSearchTerm("");
      }
    }
    fetchData();
  }, [searchTerm]);

  const searchValue = async (value) => {
    setSearchTerm(value);
  };
  function buildCard(job, idx) {
    const searchUrl = `https://www.google.com/search?q=news%20${job.company}%20internship%20summer%202020`;
    return (
      <a style={{ cursor: "pointer" }} href={searchUrl}>
        <Card key={idx}>
          <Card.Img variant="top" src={job.imgLink} />
          <Card.Body>
            <Card.Title>{job.company}</Card.Title>
            <Card.Text className={job.cancelled}>
              Cancelled? {job.cancelled}
            </Card.Text>
            <Card.Text>Location: {job.location}</Card.Text>
          </Card.Body>
        </Card>
      </a>
    );
  }

  list = displayData && displayData.map((job, idx) => buildCard(job, idx));

  if (!list || list.length === 0) {
    list = <p>404: None found.</p>;
  }

  return (
    <div className="App-body">
      <Search searchValue={searchValue}></Search>
      <CardColumns>{list}</CardColumns>
    </div>
  );
};

export default Home;
