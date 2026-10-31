import {PlanetCard } from "./components/PlanetCard"
import { PlanetForm } from "./components/PlanetForm"
import "./App.css"
import { useEffect, useState } from "react"
import { usePlanetStore } from "./store/usePlanetStore"

export default function App() {

    const {planets, getPlanet} = usePlanetStore()
    const [error, setIsError] = useState<string | null>(null)
    const [loading, setisLoading] = useState<boolean>(false)

    useEffect(() => {
        const load = async () => {
        setisLoading(true)
        setIsError(null)
        try{
            await getPlanet()
        }catch (error){
        console.error(error)
        setIsError('Что то не так')
        
        }finally{
            setisLoading(false)
        }}
        load()
    },[])


    useEffect(() => {
        console.log(planets)

    },[planets])

    return (
        <div className="layout">
            <header className="top">
                <h1>Планетарий</h1>
                 {planets?.meta && (
                    <span>{planets?.meta?.pagination.total} в коллекции</span>
                )}
            </header>

            <aside>
                <PlanetForm />
            </aside>

            <main>
                {error && <p className="error">Ошибка: </p>}
                {loading && <p className="hint">Загружаем планеты…</p>}
                {!loading && !error && planets?.data && planets.data.length > 0 ? (
                    <div className="grid">
                        {planets.data.map((el) => (
                            <PlanetCard key={el.id} {...el} />
                        ))}
                    </div>
                ) : (
                    <p className="hint">
                        Полка пуста. Добавьте первую планету через форму.
                    </p>
                )}

            </main>
        </div>
    )
}
