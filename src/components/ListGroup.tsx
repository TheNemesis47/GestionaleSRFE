import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

interface Props {
  item: string[];
  heading: string;
}

function ListGroup({ item, heading }: Props) {
  // hook = funzioni che permettono di utilizzare lo state e altre funzionalità di React senza scrivere una classe
  // useState = hook che permette di aggiungere lo state ad un componente funzionale
  const [selectedIndex, setSelectedIndex] = useState(-1);
  // props = oggetti che vengono passati ad un componente React per configurarlo
  // children = proprietà speciale che contiene tutti i figli di un componente React

  return (
    <>
      <h1>{heading}</h1>
      {item.length == 0 && <p>No users</p>}
      <ul className="list-group">
        {item.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => setSelectedIndex(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
