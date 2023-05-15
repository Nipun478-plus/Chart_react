import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { CSVLink } from 'react-csv';

function App() {
  const [str, setStr] = useState("");
  const [chart, setChart] = useState(false)
  const [words, setwords] = useState([]);
  const [freq, setfreq] = useState([]);
  const [csvFile, setCsvFile] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get('https://www.terriblytinytales.com/test.txt');
      setStr(data.data);
    }

    getData();
  })
  const countWords = (words) => {
    const frequency = {};
    for (let i = 0; i < words.length; i++) {
      if (frequency[words[i]]) {
        frequency[words[i]]++;
      } else {
        frequency[words[i]] = 1;
      }
    }
    const sortedArray = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .map(([word, count]) => `${word}: ${count}`);
    return sortedArray;
  };
  const myFun = () => {
    let words = str.match(/[a-zA-Z]+/g);
    const ans = countWords(words);
    const csvData = [
      ["Words", "Frequency"]
    ];
    var w = [];
    var f = [];
    for (let i = 0; i < 20; i++) {
      const temp = ans[i].split(':');
      csvData.push([temp[0], temp[1]]);
      w.push(temp[0]);
      f.push(parseInt(temp[1]));
    }
    setCsvFile(csvData);
    setfreq(f);
    setwords(w);
    setChart(true);
  }
  return (
    <div className="App">
      {
        chart === false ? (<div className='frontpage'>
          <div className='names'>
          <h1>Nipun Khandelwal</h1>
          <a className='link' href='https://github.com/Nipun478-plus'>GITHUB</a>
          <a className='link' href='https://www.linkedin.com/in/nipunkhandelwal/'>LINKEDIN</a>
          <h1>Terribly Tiny Tales Chart Project</h1>
          <button className='button-18 ' onClick={myFun}>Submit</button>
          </div>
        </div>) :
          (<div className='chart'>
            <button className="button-63">
              <CSVLink data={csvFile} className="csv-tag"  style={{textDecoration:"none",color:"white"}}>Export CSV</CSVLink>
            </button>
            <Chart
              type="bar"
              width={1000}
              height={600}
              series={[
                {
                  name: "Word Frequency",
                  data: freq,
                },
              ]}
              options={{
                title: {
                  text: "My Chart",
                  style: { fontSize: 20 },
                },
                plotOptions: {
                  bar: { columnWidth: '99%' }
                },
                xaxis: {
                  tickPlacement: "on",
                  categories: words,
                  title: {
                    text: "Words",
                  },
                },

                yaxis: {
                  title: {
                    text: "Frequencys",
                  },
                },
              }}
            ></Chart></div>)
      }


    </div>
  );
}

export default App;
