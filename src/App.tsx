import ListGroup from "./components/ListGroup";

function App() {
  let item = ["samuel", "john", "peter", "james"];

  return (
    <div>
      <ListGroup item={item} heading={"Utenti"} />
      <ListGroup item={item} heading={"Utenti"} />
    </div>
  );
}

export default App;
