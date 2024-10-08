import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function FlatList() {
    const [flats, setFlats] = useState([])
    const [records, setRecords] = useState([])
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        getFlats();
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
    }, []);

    function getFlats() {
        fetch("http://localhost:4000/flats?_sort=id&_order=desc")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }

                throw new Error()
            })
            .then(data => {
                const flatsWithNumericId = data.map(flat => ({
                    ...flat,
                    id: Number(flat.id)
                }));
                setFlats(flatsWithNumericId);
                setRecords(flatsWithNumericId);
            })
            .catch(error => {
                alert("Nie można pobrać danych");
            });
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
                const updatedFavorites = favorites.filter(fav => fav !== id);
                setFavorites(updatedFavorites);
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
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
    const sortById = () => {
        const sorted = [...records].sort((a, b) => a.id - b.id);
        setRecords(sorted);
    }

    const sortByIdDesc = () => {
        const sorted = [...records].sort((a, b) => b.id - a.id);
        setRecords(sorted);
    }

    const sortByPriceLow = () => {
        const sorted = [...records].sort((a, b) => a.price - b.price);
        setRecords(sorted);
    }
    const sortByPriceHigh = () => {
        const sorted = [...records].sort((a, b) => b.price - a.price);
        setRecords(sorted);
    }

    const sortByStandardLow = () => {
        const sorted = [...records].sort((a, b) => b.standard - a.standard);
        setRecords(sorted);
    }
    const sortByStandardHigh = () => {
        const sorted = [...records].sort((a, b) => a.standard - b.standard);
        setRecords(sorted);
    }

    const sortByYearNewest = () => {
        const sorted = [...records].sort((a, b) => b.year - a.year);
        setRecords(sorted);
    }
    const sortByYearOldest = () => {
        const sorted = [...records].sort((a, b) => a.year - b.year);
        setRecords(sorted);
    }

    const toogleFavorite = (flat) => {
        let updatedFavorites;
        if (favorites.includes(flat.id)) {
            updatedFavorites = favorites.filter(fav => fav!== flat.id);
        } else {
            updatedFavorites = [...favorites, flat.id]
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    }

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Oferty mieszkań</h2>

            <div className="row mb-3">
                <div className="col">
                    <Link className="btn btn-primary me-1" to="/menu/flats/create" role="button">Dodaj mieszkanie</Link>
                    <button type="button" className="btn btn-outline-primary"
                    onClick={getFlats}>Odśwież</button>
                </div>
                <div className="col">

                </div>
            </div>

            <input type="text" placeholder="wyszukaj Twoje Miasto/Miejscowość" className="form-control" onChange={Filter} />

            <div className="d-flex justify-content-around my-3 ">

                

                <div className="col">
                    <div className="col mb-2">
                        <button type="button" className="btn btn-outline-secondary me-1" onClick={sortById}>Sortuj wg ID rosnąco</button>
                    </div>

                    <div className="col">
                        <button type="button" className="btn btn-outline-secondary me-1" onClick={sortByIdDesc}>Sortuj wg ID malejąco</button>
                    </div>
                </div>

                <div className="col">
                    <div className="col mb-2">
                        <button type="button" className="btn btn-outline-secondary me-1" onClick={sortByPriceLow}>Sortuj wg ceny od najmniejszej</button>
                    </div>

                    <div className="col">
                        <button type="button" className="btn btn-outline-secondary me-1" onClick={sortByPriceHigh}>Sortuj wg ceny od największszej</button>
                    </div>
                </div>

                <div className="col">
                    <div className="col mb-2">
                        <button type="button" className="btn btn-outline-secondary me-1" onClick={sortByStandardLow}>Sortuj wg standardu od najniższego</button>
                    </div>

                    <div className="col">
                        <button type="button" className="btn btn-outline-secondary me-1" onClick={sortByStandardHigh}>Sortuj wg standardu od najwyższego</button>
                    </div>
                </div>

                <div className="col">
                    <div className="col mb-2">
                        <button type="button" className="btn btn-outline-secondary me-1" onClick={sortByYearNewest}>Sortuj wg roku oddania (najnowsze)</button>
                    </div>

                    <div className="col">
                        <button type="button" className="btn btn-outline-secondary me-1" onClick={sortByYearOldest}>Sortuj wg roku oddania (najstarsze)</button>
                    </div>
                </div>

            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Miasto/Miejscowość</th>
                        <th>Cena w tys.</th>
                        <th>Standard</th>
                        <th>Rok oddania do użytku</th>
                        <th>Zdjęcie</th>
                        <th>Edycja/Usunięcie</th>
                        <th>Ulubione</th>
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
                                    onClick={() => {
                                    if(window.confirm("Czy na pewno chcesz usunąć mieszkanie?")){
                                    deleteFlat(flat.id);
                                    }
                                    }}>Usuń</button>
                                </td>
                                <td>
                                    <button className="btn btn-outline-primary ms-2" onClick={() => toogleFavorite(flat)}>{favorites.includes(flat.id) ? "Usuń z ulubionych" : "Dodaj do ulubionych"}</button>
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
