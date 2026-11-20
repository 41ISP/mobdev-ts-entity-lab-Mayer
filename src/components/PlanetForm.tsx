import { useState } from "react"
import { TYPES, type TPlanetInput } from "../types" 

const initialForm: TPlanetInput = {
    name: "",
    description: "",
    distanceFromSun: 0,
    diameter: 0,
    mass: 0,
    type: TYPES[0], 
    discoveredDate: new Date().toISOString().split("T")[0],
    features: [],
}


interface PlanetFormProps {
    onSubmit: (data: TPlanetInput) => void
}

export function PlanetForm({ onSubmit }: PlanetFormProps) {
    const [form, setForm] = useState<TPlanetInput>(initialForm)

    const onChange = <K extends keyof TPlanetInput>(
        key: K,
        value: TPlanetInput[K],
    ) => {
        setForm((o) => ({ ...o, [key]: value }))
    }

    const onNumberChange = (key: keyof Pick<TPlanetInput, 'distanceFromSun' | 'diameter' | 'mass'>, e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value === "" ? 0 : Number(e.target.value)
        onChange(key, val)
    }

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(form)
}

    return (
        <form className="form" onSubmit={handleSubmit}>
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

            {/* Управляемый select */}
            <label className="field">
                Тип планеты
                <select
                    value={form.type}
                    onChange={(e) => onChange("type", e.target.value as TPlanetInput['type'])}
                >
                    <option>Земной тип</option>
                    <option>Газовый гигант</option>
                    <option>Ледяной гигант</option>
                    <option>Водный тип</option>
                </select>
            </label>

            <label className="field">
                Дата открытия планеты
                <input 
                    type="date" 
                    name="discoveredDate"
                    onChange={(e) => onChange("discoveredDate", e.target.value)}
                    value={form.discoveredDate}
                    required 
                />
            </label>

            <label className="field">
                Описание
                <textarea
                    rows={3}
                    name="description"
                    value={form.description ?? ""}
                    onChange={(e) => onChange("description", e.target.value)}
                    required
                />
            </label>

            <label className="field">
                Расстояние от Солнца (млн км)
                <input
                    type="number" 
                    min={0} 
                    step={10} 
                    value={form.distanceFromSun ?? ""}
                    onChange={(e) => onNumberChange('distanceFromSun', e)}
                />
            </label>

            <label className="field">
                Масса (млн тонн)
                <input 
                    type="number" 
                    min={0} 
                    step={1} 
                    value={form.mass ?? ""}
                    onChange={(e) => onNumberChange('mass', e)}
                />
            </label>

            <label className="field">
                Диаметр (км)
                <input 
                    type="number" 
                    min={0} 
                    step={1} 
                    value={form.diameter ?? ""}
                    onChange={(e) => onNumberChange('diameter', e)}
                />
            </label>

            <button className="btn" type="submit">Добавить</button>
        </form>
    )
}