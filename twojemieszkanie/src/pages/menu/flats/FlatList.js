import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function FlatList() {
    const [flats, setFlats] = useState([])
    const[records, setRecords] = useState([])

    function getFlats() {
        fetch("http://localhost:4000/flats")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }

                throw new Error()
            })
            .then(data => {
                setFlats(data);
                setRecords(data);
            })
            .catch(error => {
                alert("Nie można pobrać danych")
            })
    }

    useEffect((getFlats), []);

    function deleteFlat(id) {
        fetch("http://localhost:4000/flats/" + id, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error()
                }
                getFlats()
            })
            .catch(error => {
                alert("Nie można usunąć mieszkania")
            })
    }

    const Filter = (event) => {
        setRecords(flats.filter(f => f.location.toLowerCase().includes(event.target.value.toLowerCase()
        
    )));
    
}

    const sortByPrice = () => {
        const sorted = [...records].sort((a, b) => a.price - b.price);
        setRecords(sorted);
    }

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Oferty mieszkań</h2>

            <input type="text" placeholder="wyszukaj Twoje Miasto/miejscowość" className="form-control" onChange={Filter} />
            

            <div className="row mb=3">
                <div className="col">
                    <Link className="btn btn-primary me-1" to="/menu/flats/create" role="button">Dodaj mieszkanie</Link>
                    <button type="button" className="btn btn-outline-primary"
                    onClick={getFlats}>Odśwież</button>
                </div>
                <div className="col">

                </div>
            </div>

            <div className="col">
                <button type="button" className="btn btn-outline-secondary me-1" onClick={sortByPrice}>Sortuj wg ceny</button>

            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Miasto/miejscowość</th>
                        <th>Cena w tys.</th>
                        <th>Standard</th>
                        <th>Rok oddania do użytku</th>
                        <th>Zdjęcie</th>
                        <th>Edycja/Usunięcie</th>
                    </tr>
                </thead>
                <tbody>
                {
                    records.map((flat, index) => {
                        return (
                            <tr key={index}>
                                <td>{flat.id}</td>
                                <td>{flat.location}</td>
                                <td>{flat.price}</td>
                                <td>{flat.standard}</td>
                                <td>{flat.year}</td>
                                <td><img src={ "http://localhost:4000/images/" + flat.imageFileName }
                                width="100" alt="..."/></td>
                                <td style={{ width: "10px", whiteSpace: "nowrap"}}>
                                    <Link className="btn btn-primary btn-sm me-1"
                                    to={"/menu/flats/edit/" + flat.id}>Edytuj</Link>
                                    <button type="button" className="btn btn-danger btn-sm"
                                    onClick={() => deleteFlat(flat.id)}>Usuń</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>

        </div>
    )
}
