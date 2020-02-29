import React, { useEffect, useState } from 'react';
import serialize from 'form-serialize';
import { themoviedb, accessToken } from './constants';


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

const person = {
  imageKey: 'profile_path',
  nameKey: 'name',
  size: 'w500'
};

const movie = {
  imageKey: 'poster_path',
  nameKey: 'title',
  size: 'w185'
}

const allTypes = {
  movie,
  person
};


const getData = (val) => {
  return fetch(`${themoviedb}/search/${val}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then((response) => {
      return response.json();
    });
}

const Grid = ({ tmdbConfigs, data, ws }) => {
  const { images } = tmdbConfigs;
  const types = ['person', 'movie'];
  const [ currentType, setType ] = useState(types[0]);
  const [ imageKey, useImageKey ] = useState(allTypes[currentType]['imageKey'])
  const [nextData, setNextData] = useState(data);
  const [ currentMovie, setMovie ] = useState('');
  const [ options, setOptions ] = useState([]);
  useEffect(() => {
    ws.onmessage = (e) => {
      console.log('e: ', e);
      const json = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
      console.log('json: ', json);
      if (json.length > 1) {
        // console.log(json.length);
        useImageKey(allTypes[currentType]['imageKey']);
        setOptions(json);
        return;
      };
      setOptions([]);

      Array.isArray(json) ? setNextData(json) : null;
    }
  }, []);
  const handleData = (e) => {
    e.preventDefault();
    const data = serialize(e.target, { hash: true });
    const type = Object.keys(data)[0];
    const value = data[type];
    getData(`${type}/?query=${value}`)
      .then(res => ws.send(JSON.stringify(res.results)))
      .catch(err => console.log('err: ', err));
  }
  console.log('nextData: ', nextData);
  return (
    <section className="controls">
      <p>Base info: {images.base_url}</p>
      {currentType === 'person'
        ? (
          <form id="person" onSubmit={handleData}>
            <input type="text" name='person' />
            <input type="submit" value="Get Person Data" />
          </form>
        ) : (
        <form id="movie" onSubmit={handleData}>
          <input type="text" name='movie' />
          <input type="submit" value="Get Movie Data" />
        </form>
        )}
      {options.length > 0
        ? (
        <ul>
          {options.map(o => {
            console.log('allTypes[currentType]: ', allTypes[currentType]);
            console.log('o: ', o.name);
            // const name = o[]
            return (
              <li>
                <img
                  src={`${images.base_url}${allTypes[currentType]['size']}${o[allTypes[currentType]['imageKey']]}`}
                />
            </li>);
          
          })}
        </ul>
        )
        : null
      }
      {nextData.map((curr) => (
        <p>{curr.name || curr.title}</p>
      ))

      }
      {/* {newData[types[currentType]] ? <img src={`${base_url}/${types[currentType]['size']}${newData[types[currentType]['imageKey']]}`} /> : null} */}
    </section>
  );
};

Grid.defaultProps = {
  data: []
};

export default Grid;
