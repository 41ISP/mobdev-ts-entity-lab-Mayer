import { PlanetCard } from "./components/PlanetCard"
import { PlanetForm } from "./components/PlanetForm"
import "./App.css"
import { useEffect } from "react"
import { usePlanetStore } from "./store/usePlanetStore"

export default function App() {
    const { planets, loading, error, getPlanet, addPlanet } = usePlanetStore()

    useEffect(() => {
        getPlanet()
    }, [getPlanet])

    return (
        <div className="layout">
            <header className="top">
                <h1>Планетарий</h1>
                <span>{planets.length} в коллекции</span>
            </header>

            <aside>
                <PlanetForm onSubmit={addPlanet} />
            </aside>

            <main>
                {loading && <p className="hint">Загружаем планеты…</p>}

                {error && !loading && (
                    <p className="error">Ошибка: {error}</p>
                )}

                {!loading && !error && (
                    <>
                        {planets.length > 0 ? (
                            <div className="grid">
                                {planets.map((el) => (
                                    <PlanetCard 
                                        key={el.documentId} 
                                        {...el} 
                                        onDelete={usePlanetStore.getState().removePlanet} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="hint">
                                Полка пуста. Добавьте первую планету через форму.
                            </p>
                        )}
                    </>
                )}
            </main>
        </div>
    )
}