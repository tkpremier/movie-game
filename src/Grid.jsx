import React, { useEffect, useState } from 'react';
import serialize from 'form-serialize';

const handlethumbNailLink = (thumbnailLink = "", mult = 0, begin = 0) => {
  const base = 220;
  let link = thumbnailLink.split('s220')[0];
  const links = [];
  for (let i = begin; i < (mult + begin); i++) {
    links.push(`${link}s${base * (i + 1)}`)
  }
  return links;
};

const returnSorted = (files, sortString = 'createdTime-asc') => {
  return files.filter(file => sortString.indexOf('viewed') > -1
    ? (file.viewedByMe)
    : file
  )
    .sort((a, b) => {
      const asc = sortString.indexOf('asc') > -1;
      const prop = sortString.split('-')[0];
      const dateA = new Date(a[prop]);
      const dateB = new Date(b[prop]);
      return asc ? (dateA < dateB) : !(dateA > dateB)
    });
}

const getData = (val) => {
  const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDIzN2QwNTc3NzlmNmJkMTk1MmQ0OWU0OGQ3OTBhNCIsInN1YiI6IjVkNWVlNDdkNzlhMWMzMDAxN2U2YzYwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vEiP8WDihCrrKbbeQ5aL5Ed8_HacH8d7ac_2zcdDU5g';
  const themoviedb = 'https://api.themoviedb.org/3';
  return fetch(`${themoviedb}/search/${val}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then((response) => {
      return response.json();
    });
}

const Grid = ({ data, ws }) => {
  const [nextData, setNextData] = useState(data);
  useEffect(() => {
    ws.onmessage = (e) => {
      console.log('message: ', e);
    }
    // ws.on('open', () => {
    //   console.log('ayyyyy we open on client');
    // });
  }, []);
  const handleData = (e) => {
    e.preventDefault();
    const data = serialize(e.target, { hash: true });
    console.log('sortData e: ', data);
    const type = Object.keys(data)[0];
    const value = data[type];
    getData(`${type}/?query=${value}`)
      .then(res => ws.send(res))
      .catch(err => console.log('err: ', err));
    // const sorted = returnSorted(nextData.files, e.target.value);
    // setNextData({
    //   ...nextData,
    //   files: sorted
    // });
  }
  return (
    <section className="controls">
      <form id="person" onSubmit={handleData}>
        <input type="text" name='person' />
        <input type="submit" value="Get Person Data" />
      </form>
      <form id="movie" onSubmit={handleData}>
        <input type="text" name='movie' />
        <input type="submit" value="Get Movie Data" />
      </form>
    </section>
  );
};

Grid.defaultProps = {
  data: []
};

export default Grid;
