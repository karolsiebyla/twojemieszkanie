import PageButton from "../components/PageButton";

export default function Home() {
    return (
    
        <>
        <div className="container my-4">
        <PageButton buttonText="Przejdż do oferty mieszkań" navigateTo="/menu/flats"/>
        </div>
        <div className="container my-4">
        <h2>Jak wybrać idealny lokal mieszkalny: porady dla kupujących M2, M3 i M4</h2>
                    <div>
                        <p>
                        Wybór idealnego lokalu mieszkalnego, niezależnie od tego, czy jest to M2, M3, czy M4, to decyzja, która wymaga rozważenia wielu czynników. Oto kilka kluczowych wskazówek, które pomogą przyszłym właścicielom w podjęciu tej ważnej decyzji:
                        </p>
                        <ul>
                            <li>
                                <b>Rozważ lokalizację:</b> Lokalizacja ma kluczowe znaczenie. Należy zastanowić się, czy wolimy ciszę i spokój na obrzeżach miasta, czy bliższy dostęp do centrum z jego infrastrukturą.(...)
                            </li>
                            {/* <li><b>Ocena metrażu i układu mieszkania:</b> Zwróć uwagę na to, jak metraż został rozplanowany w danym lokalu. Czy przestrzeń jest funkcjonalna? Czy pokoje mają dostęp do światła naturalnego? Czy układ mieszkania odpowiada Twoim potrzebom?</li> */}
                            <li><b>Sprawdź standard wykończenia:</b> Warto zwrócić uwagę na jakość materiałów użytych do wykończenia mieszkania. Wysokiej jakości materiały nie tylko zwiększają komfort użytkowania, ale również mogą wpłynąć na niższe koszty utrzymania w przyszłości.</li>
                            <li><b>Przemyśl potencjalne koszty:</b> Pamiętaj, że niski koszt zakupu może wiązać się z wyższymi wydatkami na remonty lub modernizacje. Z kolei mieszkanie w wyższym standardzie może oznaczać wyższe koszty początkowe, ale mniejsze wydatki później.</li>
                            <li><b>Zwróć uwagę na dodatkowe udogodnienia:</b> Takie elementy jak balkon, taras, miejsce parkingowe czy dostęp do ogrodów wspólnych mogą znacząco podnieść jakość życia.</li>
                        </ul>
                        <p>
                            Każdy z tych punktów jest ważny przy wyborze mieszkania, które ma stać się nie tylko miejscem zamieszkania, ale <b>prawdziwym domem</b>.
                        </p>
                        <p>
                            Źródło: https://praktyczna-wiedza.pl/nieruchomosci/czym-jest-lokal-mieszkaniowy-i-co-oznaczaja-skroty-m2-m3-m4/
                        </p>
                    </div>
                    </div>
                    <div className="container my-4">
                    <PageButton buttonText="Przejdż do oferty mieszkań" navigateTo="/menu/flats"/>
                    </div>
                    </>
        
    )
}