import { useState } from "react"
import type { } from "../types"


const initialForm: TPlanetInput = {
    name: "",
    discoveredDate: new Date().toISOString().slice(0, 10),
    description: '',
    distanceFromSun: 0,
    diameter: 0,
    mass: 0,
    type: "Земной тип",
    genre: "rpg",
    features: [],
}

export function PlanetForm() {
    const [form, setForm] = useState<TPlanetInput>(initialForm)
    const onChange = <K extends keyof TPlanetInput>(
        key: K,
        value: TPlanetInput[K],
    ) => {
        setForm((o) => ({ ...o, [key]: value }))
    }

    
    return (
        <form className="form">
            <h2>Добавить планету</h2>

            <label className="field">
                Название
                <input
                    onChange={(e) => onChange("name", e.target.value)}
                    type="text"
                    name="name"
                    value={form.name}
                    required
                />
                
            </label>

   


               <label className="field">
                Тип планеты
                <select>
                    <option>Земной тип</option>
                     <option>Газовый гигант</option>
                     <option>Ледяной гигант</option>
                     <option>Водный тип</option>
                </select>
            </label>

            <label className="field">
                Дата открытия планеты
                <input type="date" 
                 name="discoveredDate"
                onChange={(e) => onChange("discoveredDate", e.target.value) }
                value={form.discoveredDate}
                required />
            </label>

            <label className="field">
                Описание
                <textarea rows={3} />
                <input
                    onChange={(e) => onChange("description", e.target.value)}
                    type="text"
                    name="description"
                    value={form.description ?? ""}
                    required
                />
            </label>



            <label className="field">
                Расстояние от нас в млн км
                <input
                 type="number" 
                 min={0} 
                 step={10} 
                 name="description"
                 value={form.description ?? ""}
                 

                 />
            </label>



            <label className="field">
                Масса в млн км
                <input type="number" min={0} step={1} />
            </label>

            {/* <label className="field">
                Число с плавающией точкой
                <input type="number" min={0} step={0.01} />
            </label> */}

            {/* <label className="field">
                <span>Диапазон</span>
                <input type="range" min={0} max={10} step={0.5} />
            </label>
         */}

          

            <fieldset>
                <legend>Группа чекбоксов</legend>
                <label className="check">
                    <input type="checkbox" />
                    Чекбокс 1
                </label>
                <label className="check">
                    <input type="checkbox" />
                    Чекбокс 2
                </label>
            </fieldset>

            <label className="check">
                <input type="checkbox" />
                Чекбокс
            </label>

            <button className="btn">Добавить</button>
        </form>
    )
}
