import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateFlat() {
    const [validationErrors, setValidationErrors] = useState({});
    const [maxId, setMaxId] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:4000/flats")
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    // Konwertuj ID na liczby całkowite i sortuj dane po ID
                    data = data.map(flat => ({ ...flat, id: parseInt(flat.id, 10) }));
                    data.sort((a, b) => a.id - b.id);
                    console.log("Sorted data:", data); // Dodaj logowanie
                    const maxId = data[data.length - 1].id; // Największe ID jest teraz ostatnim elementem
                    setMaxId(maxId);
                }
            })
            .catch(error => {
                alert("Nie można pobrać danych");
            });
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        //const flat = Object.fromEntries(formData.entries())
        const newId = isNaN(maxId) ? 1 : maxId + 1; // Użyj maxId jako liczby
        formData.append("id", newId); // Dodaj ID do FormData jako liczbę

        if (!formData.get("location") || !formData.get("price") || !formData.get("standard") || !formData.get("year") || !formData.get("image").name) {
            alert("Wypełnij wszystkie pola");
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/flats", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                navigate("/menu/flats");
            } else if (response.status === 400) {
                const data = await response.json();
                setValidationErrors(data);
            } else {
                alert("Nie ma możliwości dodania mieszkania");
            }
        } catch (error) {
            alert("Błąd połączenia z serwerem");
        }
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Dodaj ofertę</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Miasto/miejscowość</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="location" />
                                <span className="text-danger">{validationErrors.location}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Cena w tys.</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="price" type="number" step="1" min="0" />
                                <span className="text-danger">{validationErrors.price}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Standard</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="standard" type="number" step="1" min="0"/>
                                <span className="text-danger">{validationErrors.standard}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Rok oddania do użytku</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="year" type="number" step="1" min="1900"/>
                                <span className="text-danger">{validationErrors.year}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Zdjęcie</label>
                            <div className="col-sm-8">
                                <input type="file" className="form-control" name="image" />
                                <span className="text-danger">{validationErrors.image}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Dodaj</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link className="btn btn-secondary" to='/menu/flats' role="button">Anuluj</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}