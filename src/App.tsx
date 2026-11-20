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
                {/* Используем длину массива, так как в сторе лежит чистый массив планет */}
                <span>{planets.length} в коллекции</span>
            </header>

            <aside>
                {/* Передаем метод добавления из стора в форму */}
                <PlanetForm onSubmit={addPlanet} />
            </aside>

            <main>
                {/* Ровно одно состояние в каждый момент времени */}
                {loading && <p className="hint">Загружаем планеты…</p>}

                {error && !loading && (
                    <p className="error">Ошибка: {error}</p>
                )}

                {!loading && !error && (
                    <>
                        {planets.length > 0 ? (
                            <div className="grid">
                                {/* Используем documentId для ключа и передаем onDelete */}
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