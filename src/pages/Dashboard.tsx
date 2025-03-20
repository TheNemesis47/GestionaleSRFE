import ListGroup from "../components/ListGroup.tsx";
import LogoutButton from "../components/LogoutButton.tsx";
import {useState} from "react";
import Header from "../components/Header.tsx";

const Dashboard = () => {
    const [data] = useState(null);
    const items = ["ciao", "samuel"];

    return (
        <>
            <Header/>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
            <h1>ciao sono la dashboard</h1>
            <ListGroup item={items} heading={"nomi"}/>
            <LogoutButton/>
        </>
    );
};

export default Dashboard;