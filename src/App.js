import { useEffect, useState } from "react";
import Visualizer from "./Visualizer";

const bubbleSort = (array) => {
  let swaps = [];
  let arr = [...array];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swaps.push([j, j + 1]);
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return swaps;
};

const traceGenerator = (swaps, n) => {
  const elem = [];
  const pos = [];
  const posList = [];

  for (let i = 0; i < n; i++) {
    elem.push(i);
    pos.push(i);
  }

  posList.push([...pos]);

  for (const x in swaps) {
    const [pos1, pos2] = swaps[x];
    const [val1, val2] = [elem[pos1], elem[pos2]];

    elem[pos1] = val2;
    elem[pos2] = val1;

    pos[val1] = pos2;
    pos[val2] = pos1;

    posList.push([...pos]);
  }

  return posList;
};

const defaultSortState = {
  arr: [6, 5, 4, 3, 2, 1],
};

const App = () => {
  const [sort, setSort] = useState(defaultSortState);
  const swaps = bubbleSort(sort.arr);
  const n = sort.arr.length;
  const trace = traceGenerator(swaps, n);

  return (
    <>
      {"["} {sort.arr.map((num, ind) => `${num}, `)} {"]"}
      <br />
      <Visualizer arr={sort.arr} trace={trace} swaps={swaps} />
    </>
  );
};

export default App;
